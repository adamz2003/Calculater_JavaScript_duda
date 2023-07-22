function calculator() {
    var userInput = {
        total_employees: document.getElementById("1658263535").value,
        tital_locations: document.getElementById("1939586855").value,
        current_rate: document.getElementById("1066778691").value,
        current_cost: document.getElementById("1803655125").value,
        flg: function () {
            if (this.total_employees == '' || this.tital_locations == '' || this.current_rate == '' || this.current_cost == '' || this.estimated_val == '') {
                if (this.total_employees == '') {
                    document.getElementById("1658263535").focus()
                    return false;
                }
                if (this.tital_locations == '') {
                    document.getElementById("1939586855").focus()
                    return false;
                }
                if (this.current_rate == '') {
                    document.getElementById("1066778691").focus()
                    return false;
                }
                if (this.current_cost == '') {
                    document.getElementById("1803655125").focus()
                    return false;
                }
            } else {
                return true;
            }
        }
    }
    if (userInput.flg()) {
        var flg = formatInputdata(userInput);
        if(flg){
            var est_val = getMatchVal(userInput.current_rate);
            document.getElementById("1289753291").value = est_val + "%"
            main(userInput, est_val)
        }
    }
}

function main(userInput, est_val) {
    var output = {}
    output.add_val1 = userInput.total_employees * userInput.current_rate * userInput.current_cost / 100;
    output.add_mth_pEmply = 12 / userInput.current_rate * 100
    output.ann_tur_aver = 12 / (userInput.current_rate / 100 * (1 - est_val / 100))
    output.ou_1_3 = output.ann_tur_aver - output.add_mth_pEmply
    output.ou_1_4 = userInput.current_cost * 12 / (12 / userInput.current_rate * 100) - userInput.current_cost * 12 / output.ann_tur_aver
    output.ou_1_5 = output.ou_1_4 * userInput.total_employees
    output.add_val2 =  output.ou_1_5 / output.add_val1 * 100
    output.ou_2_1 = 315037 * userInput.total_employees / 1000 + 400 * userInput.tital_locations
    output.ou_2_2 = output.ou_2_1 * 0.3 + userInput.tital_locations * 100 * 12
    output.ou_2_3 = output.ou_2_2 + output.ou_2_1
    output.ou_2_4 = output.ou_2_3 / userInput.total_employees
    output.ou_3_1 = output.ou_1_5 - output.ou_2_3

    for (x in output) {
        output[x] = Math.floor(output[x] * 10) / 10;
    }
    document.getElementById("1506685073").value = "$" + Math.ceil(output.add_val1).toLocaleString();
    document.getElementById("1370520202").value = Math.ceil(output.add_mth_pEmply).toLocaleString();
    document.getElementById("1028378885").value = Math.ceil(output.ann_tur_aver).toLocaleString();
    document.getElementById("1204529933").value = Math.ceil(output.ou_1_3).toLocaleString();
    document.getElementById("1939847706").value = '$' + Math.ceil(output.ou_1_4).toLocaleString();
    document.getElementById("1209276436").value = '$' + Math.ceil(output.ou_1_5).toLocaleString();
    document.getElementById("1816334989").value = Math.ceil(output.add_val2).toLocaleString() + '%';
    document.getElementById("1173481050").value = '$' + Math.ceil(output.ou_2_1).toLocaleString();
    document.getElementById("1044700623").value = '$' + Math.ceil(output.ou_2_2).toLocaleString();
    document.getElementById("1468270031").value = '$' + Math.ceil(output.ou_2_3).toLocaleString();
    document.getElementById("1049554111").value = '$' + Math.ceil(output.ou_2_4).toLocaleString();
    var doltag = document.getElementById('formatDollarTag')
    var dolVal = document.getElementById('1440735278');
    if (output.ou_3_1 < 0) {
        doltag.innerHTML = '-$';
        dolVal.innerHTML = Math.abs(Math.ceil(output.ou_3_1)).toLocaleString();
    } else {
        doltag.innerHTML = '$';
        dolVal.innerHTML = Math.abs(Math.ceil(output.ou_3_1)).toLocaleString();
    }
}


function getMatchVal(data) {
    var param = rangeRate(data)
    if (param < 5) {
        alert(rate_data[0].t_improve)
        return rate_data[0].t_improve
    } else if (param > 150) {
        return rate_data[30].t_improve
    } else {
        var result_id;
        rate_data.forEach(function (ele, idx) {
            if (ele.high == param) {
                result_id = idx + 1;
            }
        });
        return rate_data[result_id].t_improve
    }
}

function formatInputdata(params) {
    if (!Number(params.total_employees)) {
        document.getElementById("1658263535").value = ""
        document.getElementById("1658263535").focus()
        return;
    }
    if (!Number(params.tital_locations)) {
        document.getElementById("1939586855").value = ""
        document.getElementById("1939586855").focus();
        return;
    }
    if(!Number(params.current_rate.slice(0, -1))){
        document.getElementById("1066778691").value = "";
        document.getElementById("1066778691").focus();
        return;
    } else if (Number(params.current_rate)) {
        document.getElementById("1066778691").value = params.current_rate + "%"
    } else {
        params.current_rate = params.current_rate.slice(0, -1);
    }
    if(!Number(params.current_cost.slice(1))){
        document.getElementById("1803655125").value = "";
        document.getElementById("1803655125").focus();
        return;
    } else if (Number(params.current_cost)) {
        document.getElementById("1803655125").value = "$" + params.current_cost;
        return true;
    } else {
        params.current_cost = params.current_cost.slice(1)
        return true;
    }
}

function rangeRate(val) {
    var result = (val % 5 >= 3) ? (parseInt(val / 5) * 5 + 5) : parseInt(val / 5) * 5
    return result;
}