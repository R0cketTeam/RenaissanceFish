import { useContext } from 'react';
import { DataContext } from "../components/DataContext";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import hl from '../constants/hl-gen2';

export function sketch(p5, userData1, setData, cata, setCata) {

    const high = hl(userData1)

    let paletteColor;
    let palettePicked;
    let backgroundColor;
    let color1;
    let color2;
    let palletteColorSelectOnlyOne;
    let paletteName;
    let rarityMap1;
    let rarityMap2;
    let rarityCapi;
    let rarityPuskul;
    let jargonTrait;
    let mintSize;
    let timeStamp;

    const artworkWidth = 700;
    const artworkHeight = 700;
    let otherdata = {};

    p5.setup = () => {
        //createCanvas(windowWidth, windowHeight); //adama sor
        p5.createCanvas(artworkWidth, artworkHeight);
        p5.noLoop();
        p5.frameRate(60);
        p5.pixelDensity(8);

        color1 = p5.color(1, 22, 39);
        color2 = p5.color(1, 22, 39);

        backgroundColor = high.randomElement([color1, color2]);
        paletteColor = high.randomInt(5);
        //    console.log(paletteColor);
        switch (paletteColor) {
            case 0:
                let palette0 = [
                    p5.color(1, 22, 39),
                    p5.color(253, 255, 252),
                    p5.color(46, 196, 182),
                    p5.color(231, 29, 54),
                    p5.color(255, 159, 28)
                ];
                palettePicked = palette0;
                paletteName = "Bright Sky";

                break;
            case 1:
                //https://coolors.co/palette/ffbe0b-fb5607-ff006e-8338ec-3a86ff
                let palette1 = [
                    p5.color(255, 190, 11),
                    p5.color(251, 86, 7),
                    p5.color(255, 0, 110),
                    p5.color(131, 56, 236),
                    p5.color(58, 134, 255)
                ];
                palettePicked = palette1;
                paletteName = "Good Vibes Only";

                break;
            case 2:
                // https://coolors.co/palette/dad7cd-a3b18a-588157-3a5a40-344e41
                let palette2 = [
                    p5.color(218, 215, 205),
                    p5.color(163, 177, 138),
                    p5.color(88, 129, 87),
                    p5.color(58, 90, 64),
                    p5.color(52, 78, 65)
                ];
                palettePicked = palette2;
                paletteName = "Save the Green";

                break;
            case 3:
                // https://coolors.co/palette/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0
                let palette3 = [
                    p5.color(247, 37, 133),
                    p5.color(181, 23, 158),
                    p5.color(114, 9, 183),
                    p5.color(72, 12, 168),
                    p5.color(67, 97, 238)
                ];
                palettePicked = palette3;
                paletteName = "Blue Spell";
                break;

            case 4:
                //  https://coolors.co/palette/03045e-0077b6-00b4d8-90e0ef-caf0f8          
                let palette4 = [
                    p5.color(3, 4, 94),
                    p5.color(0, 119, 182),
                    p5.color(0, 180, 216),
                    p5.color(144, 224, 239),
                    p5.color(202, 240, 248)
                ];
                palettePicked = palette4;
                paletteName = "Blue Spell";
                break;

            case 5:
                //  https://coolors.co/palette/390099-9e0059-ff0054-ff5400-ffbd00         
                let palette5 = [
                    p5.color(57, 0, 153),
                    p5.color(158, 0, 89),
                    p5.color(255, 0, 84),
                    p5.color(255, 84, 0),
                    p5.color(255, 189, 0)
                ];
                palettePicked = palette5;
                paletteName = "Colors are the Answer";
                break;

            default:
                palette3 = [
                    p5.color(1, 22, 39),
                    p5.color(253, 255, 252),
                    p5.color(46, 196, 182),
                    p5.color(231, 29, 54),
                    p5.color(255, 159, 28)
                ];
                palettePicked = palette3;
                paletteName = "Bright Sky";
                break;
        }
    }

    p5.draw = () => {
        p5.background(backgroundColor);
        p5.translate(p5.width / 2, p5.height / 2);
        rarityMap1 = high.randomInt(1, 101); //iki rakami da alio
        rarityMap2 = high.randomInt(1, 101);
        //  mintSize = high.tx.mintSize;
        mintSize = high.randomInt(1, 10);
        for (let i = 0; i < 10; i++) {
            let x1 = p5.cos(i * p5.TWO_PI / 10) * 200;
            let y1 = p5.sin(i * p5.TWO_PI / 10) * 200;
            let x2 = p5.cos((i + 1) * p5.TWO_PI / 10) * 200;
            let y2 = p5.sin((i + 1) * p5.TWO_PI / 10) * 200;

            let palletteColorSelectOnlyOneC1 = high.randomInt(4);
            let palletteColorSelectOnlyOneC2 = high.randomInt(4);

            let c1 = palettePicked[palletteColorSelectOnlyOneC1];
            let c2 = palettePicked[palletteColorSelectOnlyOneC2];


            for (let j = 0; j < 100; j++) { //YUZGEC CIZGI ADEDI - OYNAMA
                let t = p5.map(j, 0, 99, 0, 1); // OYNAMA 
                let x = p5.lerp(x1, x2, t);
                let y = p5.lerp(y1, y2, t);

                let n;
                if (rarityMap1 > 0 && rarityMap1 < 45) {
                    n = p5.noise(x * 0.005, y * 0.005);
                    rarityPuskul = 0.005;
                } else if (rarityMap1 >= 45 && rarityMap1 < 80) {
                    n = p5.noise(x * 0.025, y * 0.005);
                    rarityPuskul = 0.025;
                } else if (rarityMap1 >= 80 && rarityMap1 < 102) {
                    n = p5.noise(x * 0.015, y * 0.005);
                    rarityPuskul = 0.015;
                }

                let angle = p5.map(n, 0, 1, 0, p5.TWO_PI);
                // YUZGECLERIN UZUNLUGU
                let len;
                if (rarityMap2 > 0 && rarityMap2 < 25) {
                    len = p5.map(p5.sin(angle * 5), -1, 1, 10, 40);
                    rarityCapi = 40;
                } else if (rarityMap2 >= 25 && rarityMap2 < 60) {
                    len = p5.map(p5.sin(angle * 5), -1, 1, 10, 60);
                    rarityCapi = 60;
                } else if (rarityMap2 >= 60 && rarityMap2 < 102) {
                    len = p5.map(p5.sin(angle * 5), -1, 1, 10, 100);
                    rarityCapi = 100;
                }

                let x3 = x + p5.cos(angle) * len;
                let y3 = y + p5.sin(angle) * len;

                let col = p5.lerpColor(c1, c2, t);
                p5.stroke(col);
                p5.line(x, y, x3, y3);
            }
        }

        // SIKIK BALONCUKLAR LANET OLSN
        for (let i = 0; i < 10; i++) {
            //BALONCUKLARIN birbirinden uzakligi
            let x = p5.cos(i * p5.TWO_PI / 10) * 100;
            let y = p5.sin(i * p5.TWO_PI / 10) * 100;



            // BUNU ADAMA SOR, 1- EGER HERKES 10AR ALIRSA RARITY PORTLERDI, 10AR TANE ALANLARA AYNI TIP ZIRT CIKCAK BUNA OKAY MISINIZ?
            // BURADAKI RARITY AYARI SU AN SEDANIN GOZ ZEVKINE BAGLI AMA BUYUK BALONCUK GEREEEEEKKKKKKK
            for (let j = 0; j < 50; j++) {
                let angle = p5.map(p5.noise(x * 0.005, y * 0.005), 0, 1, 0, p5.TWO_PI); //BUNU ELLE SEDA --NOISE A BAKILSIN KULLANILAMAYABILIR EMIN DEGILIM
                let radius;
                mintSize = high.randomInt(1, 10)

                if (mintSize == 1) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 10, 50);    // orjinali 
                    jargonTrait = "FUD";
                } else if (mintSize == 2) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 1, 5);
                    jargonTrait = "NGMI";
                } else if (mintSize == 3) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 1, 50);// SPERMLI
                    jargonTrait = "FOMO";
                } else if (mintSize >= 4 && mintSize < 6) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 1, 30);// SPERMLI
                    jargonTrait = "DEGEN";
                } else if (mintSize >= 6 && mintSize < 8) {
                    radius = p5.map(p5.sin(angle * 5), 1, 10, 10, 50);
                    jargonTrait = "OG";
                } else if (mintSize >= 8 && mintSize < 10) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 10, 5);
                    jargonTrait = "HODL";
                } else if (mintSize >= 10) {
                    radius = p5.map(p5.sin(angle * 5), -10, 10, 10, 5);
                    jargonTrait = "WHALE";
                }

                let palletteColorSelectOnlyOne = high.randomInt(4);

                let col = palettePicked[palletteColorSelectOnlyOne];
                p5.noStroke()
                p5.push();
                p5.translate(x, y);
                p5.fill(col);
                p5.ellipse(0, 0, radius / 2, radius / 2);
                p5.pop();
            }
        }

        // TRAITS
        let traits = {
            "Palette": paletteName,
            "Radius": rarityCapi,
            "Paddle": rarityPuskul,
            "Jargon": jargonTrait,
        };

        let name = `RenaissanceFish #${userData1.userData?.tokenId}`;

        let description =
            `RenaissanceFish NFT Collection, created on Artela Blockchain.`;

        otherdata = {
            "name": name,
            "description": description,
            "attributes": traits
        }

        if (cata == false) {
            setData(otherdata);
            setCata(true);
        }
    };
}

export default function Wrapper(userData, dataRef) {
    const userData1 = userData
    const { data, setData, cata, setCata } = useContext(DataContext);

    if (!userData || !userData.userData) {

        return (
            <div className="container mx-auto px-4 flex items-center justify-center">

            </div>
        );
    }

    return (
        //style={{ display: 'none' }}
        <div className="container mx-auto px-4 flex items-center justify-center" style={{ display: 'none' }}  >
            <NextReactP5Wrapper sketch={(p5) => sketch(p5, userData1, setData, cata, setCata)} />
        </div>
    );
}