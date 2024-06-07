import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import bg from "../../../images/mainpg-bg.png";
import "./index.css";

interface Character {
  _id: number;
  films: string[];
  name: string;
  imageUrl: string;
  createdAt: string;
}

export const MainHeader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [charactersPairs, setCharactersPairs] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, [searchValue]);

  const fetchCharacters = () => {
    const url = "https://api.disneyapi.dev/character";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const charactersPairs: Character[] = data.data;
        const shuffledCharacters = charactersPairs.sort(() => 0.5 - Math.random());
        const pairs: [Character, Character][] = [];
        for (let i = 0; i < shuffledCharacters.length - 1; i += 2) {
          pairs.push([shuffledCharacters[i], shuffledCharacters[i + 1]]);
        }
        setCharactersPairs(pairs);
        setLoading(false);
      });
  };

  const searchCharacter = () => {
    fetchCharacters();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-row p-6 justify-center align-middle ">
        <input
          type="search"
          className="search"
          placeholder="What are you searching?"
          className="pr-24 pl-4 w-1/3 py-2 bg-transparent border-double border-2 border-white-500 rounded-md outline-none text-white"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="button" className="relative right-14" onClick={searchCharacter}>
          Search
        </button>
      </div>

      <div className="flex px-28 pt-6 pb-2 max-h-1/3 justify-center">
        <Carousel className="w-11/12 ">
          <CarouselContent>
            {charactersPairs.map((pair, index) => (
              <CarouselItem className="max-w-96" key={index}>
                <div>
                  <Card className="bg-transparent border-2 bg-slate-50 bg-opacity-20">
                    <CardHeader className="flex flex-col items-center justify-center p-2">
                      <CardTitle className="text-wrap text-purple-900">{pair[0].name}</CardTitle>
                      <CardDescription className="text-purple-950">
                        Date: {pair[0].createdAt.substring(0, 10)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <img
                        className="aspect-auto w-56 h-3/4 border-double border-stone-800 border-2 rounded-sm"
                        src={pair[0].imageUrl}
                      />
                    </CardContent>
                    <CardFooter className="p-2 text-sm justify-center">
                      <p className="text-fuchsia-950 font-waltograph">Films: {pair[0].films}</p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex px-28 pt-2 pb-2 max-h-1/3 justify-center">
        <Carousel className="w-11/12">
          <CarouselContent>
            {charactersPairs.map((pair, index) => (
              <CarouselItem className="max-w-96" key={index}>
                <div>
                  <Card className="bg-transparent border-2 bg-slate-50 bg-opacity-20">
                    <CardHeader className="flex flex-col items-center justify-center p-2">
                      <CardTitle className="text-wrap text-purple-900">{pair[1].name}</CardTitle>
                      <CardDescription className="text-purple-950">
                        Date: {pair[1].createdAt.substring(0, 10)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <img
                        className="aspect-auto w-56 h-3/4 border-double border-stone-800 border-2 rounded-sm"
                        src={pair[1].imageUrl}
                      />
                    </CardContent>
                    <CardFooter className="p-2 text-sm justify-center">
                      <p className="text-fuchsia-950">Films: {pair[1].films}</p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
