export async function getInfo(lineNumber, direction) {
  try {
    let stations = await getStations(lineNumber, direction);
    let gps = await getGpsData(lineNumber, direction);
    let basic = await getBasicInfo(lineNumber, direction);
    return {
      stations,
      gps,
      basic,
    }
  }
  catch(error) {
    throw error;
  }
}

export async function getDirectionName(lineNumber, direction) {
  try {
    let stations = await getStations(lineNumber, direction);
    console.log(stations);
    return stations.pop().name;
  }
  catch(error) {
    throw error;
  }
}

export async function getStations(lineNumber, direction) {
  let url = 'http://61.129.57.72:8181/Ajax/Handler.ashx?Method=station&roadline=' + lineNumber;
  let stream = direction == 0 ? 'Downstream' : 'Upstream' ;
  console.log(stream);
  try {
    //Upstream 1 toLeft
    //Downstream 0 toRight
    let response = await fetch(url);
    let json = await response.json();
    let data = json.data;
    let stations = [], i = 0;
    for(i = 0; i < data.length ; i++) {
      console.log(i);
      let station = {
        id: data[i].LevelId,
        name: data[i].LevelName,
        directionName: data[i].ToDirection,
      };
      if(data[i][stream] == "true") {
        console.log(station);
        stations.push(station);
      }
    }
    console.log(i);
    return stations;
  }
  catch(error)
  {
    throw(error);
  }
}

export async function getGpsData(lineNumber, direction) {
  let url = 'http://61.129.57.72:8181/interface/Handler.ashx?action=getgpsdata&roadline=' + lineNumber;
  try {
    //todir 1 Upstream
    //todir 0 Downstream
    let response = await fetch(url);
    let json = await response.json();
    let data = json.data;
    let gps = [];
    for(let i = 0; i < data.length ; i++) {
      let bus = {
        id: data[i].vnumber,
        plate: data[i].vid,
        speed: data[i].speed,
        state: data[i].state,
        nextId: data[i].nextlevel,
      };
      if(data[i].todir == direction) {
        gps.push(bus);
      }
    }
    return gps;
  }
  catch(error)
  {
    throw(error);
  }
}

export async function isStop(lineNumber) {
  let url = 'http://61.129.57.72:8181/ajax/Handler.ashx?Method=departscreen&userid=test&password=test&roadline=' + lineNumber + '&startstation=all&_=' + new Date().getTime();
  try {
    //todir 1 Upstream
    //todir 0 Downstream
    let response = await fetch(url);
    let json = await response.json();
    if(json.Count==0)
      return true;
    return false
  }
  catch(error) {
    throw error;
  }

}

export async function getBasicInfo(lineNumber, direction) {
  let url = 'http://61.129.57.72:8181/ajax/Handler.ashx?Method=departscreen&userid=test&password=test&roadline=' + lineNumber + '&startstation=all&_=' + new Date().getTime();
  try {
    //todir 1 Upstream
    //todir 0 Downstream
    let response = await fetch(url);
    let json = await response.json();
    let stations = await getGpsData(lineNumber, direction);
    let data = json.data[direction];
    console.log(json);
    let runningCount = 0;
    for(let i = 0; i < stations.length; i++) {
      if(stations[i].state == '营运车辆')
        runningCount++;
    }
    if(json.Count==0) return [];
    return [
      {
        name: '计划发车间隔',
        value: data.jhjg + ' 分钟',
      },
      {
        name: '估计发车间隔',
        value: data.yjjg + ' 分钟',
      },
      {
        name: '总共配车数量',
        value: stations.length + ' 辆',
      },
      {
        name: '营运车辆数量',
        value: runningCount + ' 辆',
      },
    ]
  }
  catch(error)
  {
    throw(error);
  }
}
