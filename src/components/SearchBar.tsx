export default function SearchBar() {
  const keyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchEvent();
    }
  };

  const searchEvent = () => {
    console.log("Buscando evento");
  };

  return (
    <div className="absolute top-72 bg-primary-dark h-36 w-4/5 rounded-xl flex flex-row items-center px-16">
      <form
        onKeyDown={keyDownHandler}
        onSubmit={searchEvent}
        className="w-full flex flex-row items-center gap-4"
      >
        <input
          className="w-3/4 h-12 rounded-xl px-4"
          name="searchBar"
          type="text"
          placeholder="Busca por artista, evento o lugar"
        />
        <button className="" onClick={searchEvent}>
          <img
            className="w-8 h-8"
            src="https://img.icons8.com/ios-glyphs/30/ffffff/search--v1.png"
            alt="magnifying-glass"
          />
        </button>
      </form>
    </div>
  );
}
