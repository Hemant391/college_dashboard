const searchfunction = (displaydata, searchdata) => {
    let res = displaydata.filter(ele => 
      ele.name.toLowerCase().includes(searchdata.toLowerCase())
    );
    return res;
  };

  const filterfunction=(displaydata,filtervalue,order)=>{
    if (!filtervalue || !order) return displaydata;
    const sortedData = [...displaydata].sort((a, b) => {
        let a1 = a[filtervalue];
        let b1 = b[filtervalue];
        if (filtervalue === 'fees') {
            // console.log(aValue,bValue)
            a1 = parseInt(a1.split(',').join(''));
            b1 = parseInt(b1.split(',').join(''));
        }
       else if (filtervalue === 'review') {
          a1 = parseFloat(a1) ;
          b1 = parseFloat(b1) ;
        }else{
            a1=Number(a1)
            b1=Number(a1)
        }
        if (a1 < b1) return order === 'Asc' ? -1 : 1;
        if (a1 > b1) return order === 'Asc' ? 1 : -1;
        return 0;
      });
    
      return sortedData;
    };



export {searchfunction,filterfunction}