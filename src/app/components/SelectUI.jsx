import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });
import { mediumOptions, yearOptions } from '@/utils/api';

// select moved to its own component to avoid ssr/csr conflicts from within albina-community-archive/page.js
const SelectUI = ({ val, placeholderText, changeHandler, year=false, medium=false  }) => {
  const options = year ? yearOptions : mediumOptions;

  return (
    <>
    <Select
        placeholder={placeholderText}
        value={val}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        isSearchable={false}
        onChange={changeHandler}
    />
    </>
  )
}

export default SelectUI;