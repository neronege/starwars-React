import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import FilterComponent from './FilterComponent.tsx';
import PaginationComponent from './PaginationComponent.tsx';
import ExcelComponent from './ExcelComponent.tsx';

const GET_ALL_DATA = gql`
  query AllPeople {
    allPeople {
      people {
        name
        birthYear
        eyeColor
        gender
      }
    }
  }
`;

const People: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Varsayılan olarak 10 öğe gösterilecek
  const [filterType, setFilterType] = useState('');
  const [filterEyeColor, setFilterEyeColor] = useState('');
  let eyeColorOptions: string[] = [];
  let genderOptions: string[] = [];
  
  useEffect(() => {
    setCurrentPage(1); // Filtre değiştiğinde sayfa numarasını sıfırla
  }, [filterType, filterEyeColor]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Data from API:', data);

  // Göz rengi seçeneklerini ve cinsiyet seçeneklerini oluşturma
  eyeColorOptions = Array.from(new Set(data.allPeople.people.map((person: any) => person.eyeColor)));
  genderOptions = Array.from(new Set(data.allPeople.people.map((person: any) => person.gender)));

  // Verileri doğru şekilde sayfalama için hesaplamalar
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const filteredPeople = data.allPeople.people.filter((person: any) => {
    // Filtreleme işlemleri burada gerçekleştirilecek
    if (filterType && person.gender !== filterType) return false;
    if (filterEyeColor && person.eyeColor !== filterEyeColor) return false;
    return true;
  });
  const currentItems = filteredPeople.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPeople.length / perPage);


 
  const filters = [
    {
      label: 'Gender',
      value: filterType,
      options: genderOptions,
      onChange: (value: string | number) => setFilterType(value as string),
    },
    {
      label: 'Eye Color',
      value: filterEyeColor,
      options: eyeColorOptions,
      onChange: (value: string | number) =>setFilterEyeColor(value as string),
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <FilterComponent filters={filters} />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
      
        <ExcelComponent data={currentItems} sheetName="StarWars People" fileName="starwars_people" />
   
        </div>
      </div>

      {/* Tablo */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Birth Year</th>
              <th>Eye Color</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((person: any, index: number) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.gender}</td>
                <td>{person.birthYear}</td>
                <td>{person.eyeColor}</td>
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

export default People;
