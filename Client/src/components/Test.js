import React, { useState } from 'react';
import Select from 'react-select';
import '../styles/test.css'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const soptions = [
    { value: 'chocolate' },
  ];


export default function Test() {
    const [selectedOption, setSelectedOption] = useState(null);
    console.log(selectedOption)
    return (
        <div className="cont">
            <div className="App">
                <Select
                isMulti
                    defaultValue={soptions}
                    onChange={setSelectedOption}
                    options={options}
                />
            </div>
        </div>
    )
}