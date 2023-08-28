import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";



const apigeral = "http://192.168.11.132:8080"


const api = axios.create({
  baseURL: apigeral,
});





export default function App() {

	
	const [arr, setarr] = useState([]);
	
  



  useEffect(() => {
	api.get("/l").then((Response) => {

 setarr(Response.data.usuario);

	});

  }, []);





  let mecanicoIdsArr = {};
  const rowSpan = arr.reduce((result, item, key) => {
    if (mecanicoIdsArr[item.mecanicoId] === undefined) {
      mecanicoIdsArr[item.mecanicoId] = key;
	
      result[key] = 1;
    } else {
      const firstIndex = mecanicoIdsArr[item.mecanicoId];
      if (
        firstIndex === key - 1 ||
        (item.mecanicoId === arr[key - 1].mecanicoId && result[key - 1] === 0)
      ) {
        result[firstIndex]++;
        result[key] = 0;
      } else {
        result[key] = 1;
        mecanicoIdsArr[item.mecanicoId] = key;
      }
    }
    return result;
  }, []);

  return (
  
    <div className="container">
       <div className="titulo">
        <div className="logo">
        
        </div>
        Programacao atividade oficina
        </div>
       <div className="op1">
     
       <table>
     <thead>
        <tr>
          <th>Mêcanico</th>
          <th>equipamento</th>
          <th>defeito</th>
          <th>status</th>
          <th>observacao</th>
        </tr>
        </thead>
        <tbody>
        {arr.map((el, index) => (
          <tr  className={el.id} key={el.id}>
       
            {rowSpan[index] > 0 && <td rowSpan={rowSpan[index]}>
			<img src={ apigeral + el.mecanico.mecanicoimg} className="LOGO1" alt=""  />

				
            </td>}
            
            <td>
              
           
                                      
            <img src={apigeral + el.equipamento.equipamentoimg} className="LOGO12" alt="" width="30" />
            {" " + el.equipamentoId} 
                             
                             
                             
                              </td>
            
                              <td className="texto">{el.defeito}</td>
          
          
          


            <td>
              
			<img src={apigeral + el.status.statuscor} className="LOGO1" alt="Vite logo" width="20" />
                        

			</td>


                <td className="texto">{el.obsevacao}</td>
           
          
          
          </tr>
        ))}
        </tbody>
      </table>
      </div>
     </div>
    
  );
}