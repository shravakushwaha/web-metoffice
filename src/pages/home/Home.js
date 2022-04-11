import React, { useState,useEffect } from "react";
import axios from "axios";
import url from "../../api/url";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './home.css'
import * as yup from "yup";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DataTable from "../../components/datatable/DataTable";


function Home() {
    const [region, setRegion] = useState([]);
    const [regionName, setRegionName] = useState("");
    const [parameter, setParameter] = useState([]);
    const [parameterName, setParameterName] = useState("");
    const [type, setType] = useState("");
    const [metoffice, setMetoffice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    
    let formData = {
        regionName: regionName,
        parameterName: parameterName,
        type: type,
      };

      const FormSchema = yup.object().shape({
        regionName: yup.string().required(),
        parameterName: yup.string().required(),
        type: yup.string().required()
      });
  let columns = "";
  if (type == "date"){
    columns = [
        { field: "id", headerName: "Id", width: 90 },
        { field: "years", headerName: "years", width: 190 },
    
        {
          field: "jan",
          headerName: "jan",
          width: 180,
        },
    
        {
          field: "may",
          headerName: "may",
          width: 180,
        },
        {
            field: "jun",
            headerName: "jun",
            width: 180,
          },
          {
            field: "jul",
            headerName: "jul",
            width: 180,
          },
          {
            field: "aug",
            headerName: "aug",
            width: 180,
          },
          {
            field: "sep",
            headerName: "sep",
            width: 180,
          },
          {
            field: "oct",
            headerName: "oct",
            width: 180,
          },
          {
            field: "nov",
            headerName: "nov",
            width: 180,
          },
          {
            field: "dec",
            headerName: "dec",
            width: 180,
          },
          {
            field: "sum",
            headerName: "sum",
            width: 180,
          },
          {
            field: "win",
            headerName: "win",
            width: 180,
          },
          {
            field: "ann",
            headerName: "ann",
            width: 180,
          },
    ]
  }else{
    columns = [
      { 
        field: "id",
        headerName: "Id",
        width: 90 
      },
      {
        field: "jan",
        headerName: "jan",
        width: 180,
      },
      { 
        field: "year_jan",
        headerName: "year",
        width: 190 
      },
  
      {
        field: "may",
        headerName: "may",
        width: 180,
      },
      { 
        field: "year_may",
        headerName: "year",
        width: 190 
      },
      {
          field: "jun",
          headerName: "jun",
          width: 180,
        },
        { 
          field: "year_jun",
          headerName: "year",
          width: 190 
        },
        {
          field: "jul",
          headerName: "jul",
          width: 180,
        },
        { 
          field: "year_jul",
          headerName: "year",
          width: 190 
        },
        {
          field: "aug",
          headerName: "aug",
          width: 180,
        },
        { 
          field: "year_aug",
          headerName: "year",
          width: 190 
        },
        {
          field: "sep",
          headerName: "sep",
          width: 180,
        },
        { 
          field: "year_sep",
          headerName: "year",
          width: 190 
        },
        {
          field: "oct",
          headerName: "oct",
          width: 180,
        },
        { 
          field: "year_oct",
          headerName: "year",
          width: 190 
        },
        {
          field: "nov",
          headerName: "nov",
          width: 180,
        },
        { 
          field: "year_nov",
          headerName: "year",
          width: 190 
        },
        {
          field: "dec",
          headerName: "dec",
          width: 180,
        },
        { 
          field: "year_dec",
          headerName: "year",
          width: 190 
        },
        {
          field: "sum",
          headerName: "sum",
          width: 180,
        },
        { 
          field: "year_sum",
          headerName: "year",
          width: 190 
        },
        {
          field: "win",
          headerName: "win",
          width: 180,
        },
        { 
          field: "year_win",
          headerName: "year",
          width: 190 
        },
        {
          field: "ann",
          headerName: "ann",
          width: 180,
        },
        { 
          field: "year_ann",
          headerName: "year",
          width: 190 
        },
        {
          field: "aut",
          headerName: "aut",
          width: 180,
        },
        { 
          field: "year_aut",
          headerName: "year",
          width: 190 
        },
        {
          field: "spr",
          headerName: "spr",
          width: 180,
        },
        { 
          field: "year_spr",
          headerName: "year",
          width: 190 
        },
  ]
  }
    const rows = metoffice;
    console.log("rows=============",rows)

    const handlePageChange = (page) => {
        console.log("page=========", page);
        if (!isLastPage) {
          if (page + 1 > currentPage) {
            setCurrentPage((currentPage) => currentPage + 1);
            
            setLoading(true);
          }
        }
      };
    
    
    const handleSubmit = async (e) => {
            console.log(formData)
            const isValid = await FormSchema.isValid(formData);
            
            if(isValid){
                try {
                    setLoading(true);
                    console.log("currentPage===========",currentPage)
                    const response = await axios.get(`${url.baseUrl}/metoffice?region=${regionName}&parameter=${parameterName}&type=${type}&current_page=${currentPage}&page_size=50`);
                    console.log("response.data==========",response.data.metoffice_list)
                    if (currentPage > 1) {
                        setMetoffice([...metoffice, ...response.data.metoffice_list]);
                      } else {
                        setMetoffice(response.data.metoffice_list);
                      }
                    setIsLastPage(response.data.is_last_page);
                    setLoading(false);
                  } catch (error) {
                    setMetoffice([]);
                  }
                
                }else{
                    alert("all field required");
                }
            };
                

useEffect(() => {
    getRegionList();
    getParameterList();
    if(currentPage > 1){
        handleSubmit();
    }
    }, [currentPage]);
  const getRegionList = () => {
    axios({
      method: "get",
      url: `${url.baseUrl}/enums/region`,
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
            console.log(response.data);
            setRegion(response.data)
        }
      })
      .catch((err) => {
        console.log("error===========");
        setRegion([])
      });
  };

  const getParameterList = () => {
    axios({
      method: "get",
      url: `${url.baseUrl}/enums/parameter`,
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
            console.log(response.data);
            setParameter(response.data)
        }
      })
      .catch((err) => {
        console.log("error===========");
        setParameter([])
      });
  };


  return (
    <>
    <div class="container">
        <Image src="https://www.ready.gov/sites/default/files/2019-09/severe%20weather_3_0.jpg" class="img-fluid img" alt="Responsive image"></Image>
        <div class="card text-center">
            <div class="card-header">
                <h3>UK and regional series</h3>
            </div>
            <div class="card-body">
                <div class="container">
                <form >
                <div class="row">
                    <div class="col">
                    
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Region</label>
                            <select class="form-control"
                             id="exampleFormControlSelect1"
                             value={regionName}
                            onChange={(ev) => setRegionName(ev.target.value)}
                             required>
                            <option value={null}>Select region</option>
                            {region.map((name) => {
                                return (
                                <>
                                    <option value={name}>
                                        {name}
                                    </option>
                                </>
                                );
                            })}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Parameter</label>
                            <select class="form-control" id="exampleFormControlSelect1"
                            value={parameterName}
                            onChange={(ev) => setParameterName(ev.target.value)}
                            required >
                            <option>Select parameter</option>
                            {parameter.map((name) => {
                                return (
                                <>
                                    <option value={name}>
                                        {name}
                                    </option>
                                </>
                                );
                            })}
                            </select>
                        </div>
                    </div>
                    <div className="col" >
                            <div className="form-group">
                            <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={type}
                                onChange={(ev) => {setType(ev.target.value);setMetoffice([])}}
                                required>
                                <FormControlLabel value="date" control={<Radio />} label="Year ordered statistics" />
                                <FormControlLabel value="ranked" control={<Radio />} label="Rank ordered statistics" />
                            </RadioGroup>
                            </FormControl>
                            </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">&nbsp;</label>
                            <Button class="form-control" id="exampleFormControlSelect1" variant="primary" onClick={handleSubmit}>Submit</Button>
                        </div>
                        
                    </div>
                </div>
                </form>
                </div>
                
            </div>
            </div>
            <DataTable
                loading={loading}
                columns={columns}
                metofficeRows={rows}
                onPageChange={handlePageChange}
                />
        </div>
        </>
  )
}

export default Home