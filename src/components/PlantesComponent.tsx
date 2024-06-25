import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import FilterComponent from './FilterComponent';
import PaginationComponent from './PaginationComponent';
import ExcelComponent from './ExcelComponent';

export const GET_ALL_DATA = gql`
  query AllPlanets {
    allPlanets {
      planets {
        name
        population
        climates
        gravity
      }
    }
  }
`;

const PlanetsComponent: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Varsayılan olarak 10 öğe gösterilecek
  const [filterclimates, setFilterclimates] = useState('');
  const [filterpopulation, setFilterpopulation] = useState<number | -1>(-1);
  let populationOptions: number[] = [];
  let climatesOptions: string[] = [];

  useEffect(() => {
    setCurrentPage(1); // Filtre değiştiğinde sayfa numarasını sıfırla
  }, [filterclimates, filterpopulation]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Data from API:', data);
  // Nüfus seçeneklerini ve iklim seçeneklerini oluşturma
  populationOptions = Array.from(new Set(data.allPlanets.planets.map((planet:any) => parseInt(planet.population)).filter((population:any) => !isNaN(population))));
  climatesOptions = Array.from(new Set(data.allPlanets.planets.flatMap((planet:any) => planet.climates)));

  // Verileri doğru şekilde sayfalama için hesaplamalar
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const filteredplanets = data.allPlanets.planets.filter((planet:any) => {
    // Filtreleme işlemleri burada gerçekleştirilecek
    if (filterclimates && !planet.climates.includes(filterclimates)) return false;
    if (filterpopulation !== -1 && parseInt(planet.population) !== filterpopulation) return false;
    return true;
  });
  const currentItems = filteredplanets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredplanets.length / perPage);



    // Filtre bileşeni için filtreler listesi oluşturma
    const filters = [
      {
        label: 'Population',
        value: filterpopulation === -1 ? '' : filterpopulation,
        options: populationOptions,
        onChange: (value: string | number) => setFilterpopulation(value === '' ? -1 : Number(value)),
      },
      {
        label: 'Climates',
        value: filterclimates,
        options: climatesOptions,
        onChange: (value: string | number) => setFilterclimates(value as string),
      },
    ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <FilterComponent filters={filters} />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
        <ExcelComponent data={currentItems} sheetName="StarWars Planets" fileName="starwars_planets" />
        </div>
      </div>

      {/* Tablo */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Population</th>
              <th>Climates</th>
              <th>Gravity</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((planet: { name: string; population: string; climates: string[]; gravity: string }) => (
              <tr key={planet.name}>
                <td>{planet.name}</td>
                <td>{planet.population}</td>
                <td>{planet.climates.join(', ')}</td>
                <td>{planet.gravity}</td>
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

export default PlanetsComponent;
