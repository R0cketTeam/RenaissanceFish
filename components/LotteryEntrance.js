import FishABI from "../constants/FishABI.json";
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import dotenv from 'dotenv';
import Wrapper from "./Wrapper";
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../components/DataContext';
import { captureCanvasImage } from "../utils/captureCanvasImage";
import { useSwitchChain } from 'wagmi'

dotenv.config();

export default function LotteryEntrance() {
    const provider = new ethers.providers.JsonRpcProvider("https://betanet-rpc1.artela.network/");
    const FishContract = process.env.FISH_CONTRACT;

    const provide = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provide.getSigner();

    const contract = new ethers.Contract(FishContract, FishABI, provider);

    const { switchChain } = useSwitchChain()
    const { address, chainId } = useAccount();
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const { data, setData, iref, cata, setCata } = useContext(DataContext);
    const [userData, setUserData] = useState(null);
    const [id, setId] = useState(null);
    const [minting, setMinting] = useState(false);
    const [tsupply, setTsupply] = useState(0);

    const listenToFishMintedEvent = () => {
        contract.on("FishMinted", (owner, tokenId, tokenURI, event) => {
            console.log("FishMinted event detected:", owner, tokenId, tokenURI);
            fetchTotalSupply(); // Fetch the updated total supply when a mint event occurs
        });
    };

    const tokenID = async () => {
        const tid = await contract.totalSupply();
        setId(tid.toNumber());
        const userData = {
            contractAddress: process.env.FISH_CONTRACT,
            chainId: chainId,
            tokenId: tid.toNumber(),
            walletAddress: address,
            timestamp: unixTimestamp,
        };
        setUserData(userData);
    };

    async function mintFish(tokenId, URI) {
        const contractWithSigner = new ethers.Contract(FishContract, FishABI, signer);

        try {
            const transaction = await contractWithSigner.mintFish(tokenId, URI);
            console.log("Transaction sent:", transaction);
            return transaction;
        } catch (error) {
            if (error.message.includes("reverted")) {
                console.log("Transaction reverted");
                handleFailedNotification("Transaction reverted: Ether value sent is below the price.");
            } else {
                console.log("Error:", error.message);
                handleFailedNotification(`Error: ${error.message}`);
            }
            throw error;
        }
    }

    const handleSuccessNotification = () => toast.success("Minted!");

    const handleFailedNotification = () => toast.error("Failed!");

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            console.log("Transaction confirmed:", tx);
            handleSuccessNotification();
        } catch (error) {
            console.log("Transaction error:", error);
            handleFailedNotification();
        } finally {
            setMinting(false);
            setData(null)
            setCata(false)
            setId(null)
            setUserData(null)
        }
    };

    useEffect(() => {
        if (userData && data) {
            const mintFishProcess = async () => {
                try {
                    const URL = await captureCanvasImage(data);
                    const cleanUri = URL.replace('ipfs://', '');
                    const lastUri = `https://ipfs.io/ipfs/${cleanUri}`;
                    const transaction = await mintFish(id, lastUri);
                    await handleSuccess(transaction);
                } catch (error) {
                    console.error("Minting process failed:", error);
                }
            };
            mintFishProcess();
        }
    }, [userData, data, id]);

    const fetchTotalSupply = async () => {
        try {
            const total = await contract.totalSupply();
            setTsupply(total.toNumber());
        } catch (error) {
            console.error("Failed to fetch total supply:", error);
        }
    };

    useEffect(() => {
        fetchTotalSupply();
        listenToFishMintedEvent(); // Set up the event listener
        return () => {
            contract.off("FishMinted"); // Clean up the event listener
        };
    }, []);
    return (
        <>
            <div className="p-5 flex h-[700px] w-[700px] items-center justify-center ">
                <div className="w-full max-w-2xl items-center justify-center bg-white border border-zinc-200 shadow dark:bg-zinc-950 dark:border-zinc-700">
                    <div className="p-5 m-10 ">
                        <div>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 tracking-widest">RenaissanceFish</h5>
                            <p className="leading-6 text-m text-gray-900 dark:text-white mb-4">
                                Welcome to the tranquil embrace of the ocean with the RenaissanceFish NFT collection on the Artela Network. This collection aims to capture the quiet freedom of fish as they gracefully navigate the infinite sea, reflecting the boundless possibilities and gentle flow of the blockchain world. <br /> <br />Each piece is a serene testament to the harmony between nature and technology, inviting you to experience the beauty of both.

                                <br /><br /> By owning a RenaissanceFish NFT, you become part of a revolutionary movement that celebrates freedom, creativity, and the boundless potential of technology. Each fish in the collection is not just a piece of art but a symbol of the harmonious convergence of nature and technology, representing the endless possibilities that lie ahead.
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-l font-semibold text-gray-900 dark:text-white tracking-widest">Free Mint</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-l font-semibold text-gray-900 dark:text-white mt-2 tracking-widest">{tsupply} Minted</span>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                {chainId == 11822 ? (
                                    <button
                                        className={`bg-blue-800 hover:bg-blue-600 text-white font-bold px-20 py-3.5 mt-5 ${minting ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={async () => {

                                            setMinting(true);
                                            await tokenID();

                                        }}

                                    >
                                        {minting ? "Minting..." : "Mint Fish"}
                                    </button>
                                ) : (
                                    <button
                                        className={`bg-blue-800 hover:bg-blue-600 text-white font-bold px-20 py-3.5 mt-5`}
                                        onClick={() => switchChain({ chainId: 11822 })}
                                    >
                                        Switch to Mint Mainnet
                                    </button>
                                )
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div >
            <Wrapper userData={userData} />
        </>
    );
}
