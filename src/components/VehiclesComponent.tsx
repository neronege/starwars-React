import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import FilterComponent from './FilterComponent';
import PaginationComponent from './PaginationComponent';
import ExcelComponent from './ExcelComponent';

export const GET_ALL_DATA = gql`
  query AllVehicles {
    allVehicles {
      vehicles {
        name
        model
        vehicleClass
        manufacturers
      }
    }
  }
`;

const VehiclesComponent: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Varsayılan olarak 10 öğe gösterilecek
  const [filtervehicleClass, setFiltervehicleClass] = useState('');
  const [filterModel, setFilterModel] = useState('');
  let modelOptions: string[] = [];
  let vehicleClassOptions: string[] = [];

  useEffect(() => {
    setCurrentPage(1); // Filtre değiştiğinde sayfa numarasını sıfırla
  }, [filtervehicleClass, filterModel]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Data from API:', data);
  modelOptions = Array.from(new Set(data.allVehicles.vehicles.map((vehicle:any) => vehicle.model)));
  vehicleClassOptions = Array.from(new Set(data.allVehicles.vehicles.map((vehicle:any) => vehicle.vehicleClass)));

  // Verileri doğru şekilde sayfalama için hesaplamalar
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const filteredVehicles = data.allVehicles.vehicles.filter((vehicle:any) => {
    // Filtreleme işlemleri burada gerçekleştirilecek
    if (filtervehicleClass && vehicle.vehicleClass !== filtervehicleClass) return false;
    if (filterModel && vehicle.model !== filterModel) return false;
    return true;
  });
  const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVehicles.length / perPage);




  const filters = [
    {
      label: 'Model',
      value: filterModel,
      options: modelOptions,
      onChange: (value: string | number) => setFilterModel(value as string),
    },
    {
      label: 'VehicleClass',
      value: filtervehicleClass,
      options: vehicleClassOptions,
      onChange: (value: string | number) =>setFiltervehicleClass(value as string),
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <FilterComponent filters={filters} />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
        <ExcelComponent data={currentItems} sheetName="StarWars Vehicles" fileName="starwars_vehicles" />
        </div>
      </div>

      {/* Tablo */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Vehicle Class</th>
              <th>Manufacturers</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((vehicle: { name: string; model: string; vehicleClass: string; manufacturers: string }) => (
              <tr key={vehicle.name}>
                <td>{vehicle.name}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.vehicleClass}</td>
                <td>{vehicle.manufacturers}</td>
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

export default VehiclesComponent;
