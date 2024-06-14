import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import FilterComponent from './FilterComponent.tsx';
import PaginationComponent from './PaginationComponent.tsx';
import ExcelComponent from './ExcelComponent.tsx';

const GET_ALL_DATA = gql`
  query AllFilms {
    allFilms {
      films {
        title
        episodeID
        director
        producers
      }
    }
  }
`;

const FilmsComponent: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(10); // Varsayılan olarak 10 öğe gösterilecek
  const [filterEpisodeID, setFilterEpisodeID] = useState<number | -1>(-1);
  const [filterDirector, setFilterDirector] = useState<string>('');
  let directorOptions: string[] = [];
  let episodeIDOptions: number[] = [];

  useEffect(() => {
    setCurrentPage(1); // Filtre değiştiğinde sayfa numarasını sıfırla
  }, [filterEpisodeID, filterDirector]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Data from API:', data);

  // Direktör seçeneklerini ve Episode ID seçeneklerini oluşturma
  directorOptions = Array.from(new Set(data.allFilms.films.map(film => film.director)));
  episodeIDOptions = Array.from(new Set(data.allFilms.films.map(film => film.episodeID)));

  // Verileri doğru şekilde sayfalama için hesaplamalar
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const filteredFilms = data.allFilms.films.filter(film => {
    // Filtreleme işlemleri burada gerçekleştirilecek
    if (filterEpisodeID !== -1 && film.episodeID !== filterEpisodeID) return false;
    if (filterDirector && film.director !== filterDirector) return false;
    return true;
  });
  const currentItems = filteredFilms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFilms.length / perPage);


  // Filtre bileşeni için filtreler listesi oluşturma
  const filters = [
    {
      label: 'Episode ID',
      value: filterEpisodeID === -1 ? '' : filterEpisodeID,
      options: episodeIDOptions,
      onChange: (value: string | number) => setFilterEpisodeID(value === '' ? -1 : Number(value)),
    },
    {
      label: 'Director',
      value: filterDirector,
      options: directorOptions,
      onChange: (value: string | number) => setFilterDirector(value as string),
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <FilterComponent filters={filters} />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
        <ExcelComponent data={currentItems} sheetName="StarWars Films" fileName="starwars_films" />
        </div>
      </div>

      {/* Tablo */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Episode ID</th>
              <th>Director</th>
              <th>Producers</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((film, index) => (
              <tr key={index}>
                <td>{film.title}</td>
                <td>{film.episodeID}</td>
                <td>{film.director}</td>
                <td>{film.producers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sayfalama bağlantıları */}
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} paginate={setCurrentPage} />
    </div>
  );
};

export default FilmsComponent;
