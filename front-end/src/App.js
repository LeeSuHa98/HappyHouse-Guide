
import Main from "./source/Main"
import Marker from "./source/marker"
import axios from 'axios';

function App() {
  state = {
    isLoading: true,
    data: [],
}
getData = async () => {
    const{ data: {
        dataListResult:
        {dataList}}
    } = await axios.get('https://data.myhome.go.kr/rentalHouseList?brtcCode=11&signguCode=140&ServiceKey=1Vjb85Toni3AxZhaHs78nbBGNPfb8fhLLVkXP9EcUqJ7VPcg5SIXBGBZfkU1hiOp%2F8JjmzOzQx%2FbVpXa7tqOLg%3D%3D')
    this.setState({data: dataList, isLoading: false})
}
componentDidMount(){
    this.getData();
}
render(){
    const { isLoading, data } = this.state;
    return(
        <div>
            {isLoading ? "Loading...." : data.map((markers)=>{
                console.log(markers);
                return(
                    <Marker>
                      btrcCode={markers.brtcCode}
                      signguCode={markers.signguCode}
                      numOfRows={markers.numOfRows}
                      pageNo={markers.pageNo}
                    </Marker>
                )
            })}
        </div>
    )
}
}

export default App;
