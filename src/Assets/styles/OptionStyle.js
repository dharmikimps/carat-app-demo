export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#8d8c8c' : 'white',
    '&:hover': {
      background: '#cac4c4'
    }
  }),
  control: (styles) => ({
    ...styles,
    border: '1px solid #707070',
    borderRadius: '10px',
    width: '100px',
    display: 'flex',
    '&:hover': {
      borderColor: '#000'
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 3,
    width: '100px',
    marginTop: '2px',
    padding: 0
  }),
  menuList: (base) => ({
    ...base,
    height: 'auto',
    padding: 0
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#707070';
    return { ...provided, transition, color, opacity };
  }
};

export const directoryOptionsStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#8d8c8c' : 'white',
    '&:hover': {
      background: '#cac4c4'
    }
  }),
  control: (styles) => ({
    ...styles,
    border: '1px solid #707070',
    borderRadius: '10px',
    display: 'flex',
    '&:hover': {
      borderColor: '#000'
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 3,
    marginTop: '5px',
    padding: 0
  }),
  menuList: (base) => ({
    ...base,
    height: 'auto',
    padding: 0
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#707070';
    return { ...provided, transition, color, opacity };
  }
};

export const spreeOptionsStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#8d8c8c' : 'white',
    '&:hover': {
      background: '#cac4c4'
    }
  }),
  control: (styles) => ({
    // none of react-select's styles are passed to <Control />
    ...styles,
    border: '1px solid #707070',
    borderRadius: '10px',
    display: 'flex',
    '&:hover': {
      borderColor: '#000'
    }
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 5,
    marginTop: '3px'
  }),
  menuList: (base) => ({
    ...base,
    height: 'auto'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#707070';
    return { ...provided, transition, color, opacity };
  }
};

export const messageListOptionStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#8d8c8c' : 'white',
    margin: 0,
    padding: 10,
    fontFamily: 'Magdelin-Medium',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: '#cac4c4'
    }
  }),
  control: (styles) => ({
    ...styles,
    border: '1px solid #707070',
    borderRadius: '10px',
    display: 'flex',
    '&:hover': {
      borderColor: '#000'
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 10,
    marginTop: '1px'
  }),
  menuList: (base) => ({
    ...base,
    height: '250px'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#707070';
    return { ...provided, transition, color, opacity };
  }
};
