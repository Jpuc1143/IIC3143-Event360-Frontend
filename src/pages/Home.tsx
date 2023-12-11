import SearchBar from "../components/SearchBar";
import main_img from "../assets/party.jpeg";
import Events from "./event/Events";

export default function Home() {
  return (
    <div className="mx-16 my-8">
      <div className="flex flex-col items-center relative mb-16">
        <h1 className="py-4 absolute mt-12 bg-white/40 w-full flex justify-center">
          <span className="text-primary-dark text-5xl font-bold">Event</span>
          <span className="text-primary-light text-5xl font-bold">360</span>
        </h1>
        <img
          className="w-full max-h-96 rounded-xl object-cover"
          src={main_img}
          alt="main-img"
        />
        <SearchBar />
      </div>
      <Events />
    </div>
  );
}
