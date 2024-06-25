import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import PaginationComponent from './PaginationComponent';
import FilterComponent from './FilterComponent';
import ExcelComponent from './ExcelComponent';

const GET_ALL_DATA = gql`
  query AllStarShips {
    allStarships {
      starships {
        name
        model
        starshipClass
        maxAtmospheringSpeed
      }
    }
  }
`;

type Starship = {
  name: string;
  model: string;
  starshipClass: string;
  maxAtmospheringSpeed: string;
};

const Starships: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(10); // Varsayılan olarak 10 öğe gösterilecek
  const [filterModelOptions, setFilterModelOptions] = useState<string>('');
  const [filterStarshipClass, setFilterStarshipClass] = useState<string>('');
  let starshipClassOptions: string[] = [];
  let modelOptions: string[] = [];

  useEffect(() => {
    setCurrentPage(1); // Filtre değiştiğinde sayfa numarasını sıfırla
  }, [filterModelOptions, filterStarshipClass]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Data from API:', data);

  // Model ve Starship Class seçeneklerini oluşturma
  modelOptions = Array.from(new Set(data.allStarships.starships.map((starship: Starship) => starship.model)));
  starshipClassOptions = Array.from(new Set(data.allStarships.starships.map((starship: Starship) => starship.starshipClass)));

  // Verileri doğru şekilde sayfalama için hesaplamalar
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const filteredStarships = data.allStarships.starships.filter((starship: Starship) => {
    // Filtreleme işlemleri burada gerçekleştirilecek
    if (filterModelOptions && starship.model !== filterModelOptions) return false;
    if (filterStarshipClass && starship.starshipClass !== filterStarshipClass) return false;
    return true;
  });

  const currentItems = filteredStarships.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStarships.length / perPage);

  

  const filters = [
    {
      label: 'Model',
      value: filterModelOptions,
      options: modelOptions,
      onChange: (value: string | number) => setFilterModelOptions(value as string),
    },
    {
      label: 'ShipClass',
      value: filterStarshipClass,
      options: starshipClassOptions,
      onChange: (value: string | number) =>setFilterStarshipClass(value as string),
    },
  ];
 

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <FilterComponent filters={filters} />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
        <ExcelComponent data={currentItems} sheetName="StarWars Starships" fileName="starwars_starships" />
        </div>
      </div>

      {/* Tablo */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Starship Class</th>
              <th>Max Atmosphering Speed</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((starship: Starship) => (
              <tr key={starship.name}>
                <td>{starship.name}</td>
                <td>{starship.model}</td>
                <td>{starship.starshipClass}</td>
                <td>{starship.maxAtmospheringSpeed}</td>
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

export default Starships;
