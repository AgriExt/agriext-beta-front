function processCSV(file):any {
    let splitCSV = file.split(/\n/),
        head = splitCSV[0].split(','),
        body = splitCSV.slice(0, splitCSV.length).map((value) => {
            return value.split(',');
        });
    return {
        head: head,
        body: body
    }
}

export function csvToJson(file):Array<any> {
    let csv = processCSV(file),
        datas = [],
        json = null;
    for (let data of csv.body) {
        json = {};
        for (let i = 0; i < data.length; i++) {
            json[csv.head[i]] = data[i];
        }
        datas.push(json);
    }
    return datas;
}
