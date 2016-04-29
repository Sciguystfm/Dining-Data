$(function() {
    swal({
        title: 'RIT Username',
        type: 'input',
        showCancelButton: false,
        closeOnConfirm: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: false
    }, function gotUsername(username) {
        swal({
            title: 'Action',
            text: 'Do you want to update your transactions now?',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Fuck yes',
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: false
        }, function(isConfirm) {
            //Get new transactions
            if (isConfirm) {
                swal({
                    title: 'RIT Password',
                    text: '',
                    type: 'input',
                    inputType: 'password',
                    showCancelButton: false,
                    closeOnConfirm: false,
                    showConfirmButton: true,
                    showLoaderOnConfirm: false
                }, function(password) {
                    $.ajax({
                        url: "http://localhost:5000/scrape",
                        headers: {
                            authorization: 'Basic ' + btoa(username + ':' + password)
                        },
                        data: {
                            sdate: '09/01/2015',
                            edate: '04/28/2016'
                        },
                        cache: false,
                        success: function(transactions) {
                            showLoadData(username)
                        },
                        error: swal({
                            title: "Something went wrong",
                            text: "Make sure you're connected to the internet and your Username/Password is correct",
                            type: "error",
                            showLoaderOnConfirm: false
                        }, attemptLogin())

                    });
                })
                //display old data
            } else {
                showLoadData(username)
            }
        })
    })
})

function showLoadData(username) {
    swal({
        title: 'User Authenticated',
        text: 'Click okay to load your data',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Load',
        showLoaderOnConfirm: true
    }, function() {
        $.ajax({
            url: "http://localhost:5000/transaction/" + username,
            cache: false,
            success: function(transactions) {
                getData(transactions.transactions);
                swal('Done!');
            }
        });
    })
}

function attemptLogin() {
    swal({
        title: 'RIT Username',
        type: 'input',
        showCancelButton: false,
        closeOnConfirm: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: false
    }, function gotUsername(username) {
        swal({
            title: 'Action',
            text: 'Do you want to scrape your transactions now?',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Fuck yes',
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: false
        }, function(isConfirm) {
            if (isConfirm) {
                swal({
                    title: 'RIT Password',
                    text: '',
                    type: 'input',
                    inputType: 'password',
                    showCancelButton: false,
                    closeOnConfirm: false,
                    showConfirmButton: true,
                    showLoaderOnConfirm: true
                }, function(password) {
                    $.ajax({
                        url: "http://localhost:5000/scrape",
                        headers: {
                            authorization: 'Basic ' + btoa(username + ':' + password)
                        },
                        data: {
                            sdate: '09/01/2015',
                            edate: '04/28/2016'
                        },
                        cache: false,
                        success: function(transactions) {
                            showLoadData(username)
                        },
                        error: swal({
                            title: "Something went wrong",
                            text: "Make sure you're connected to the internet and your Username/Password is correct",
                            type: "error",
                            showLoaderOnConfirm: false
                        }, attemptLogin())

                    });
                })
            } else {
                showLoadData(username)
            }
        })
    })
}


var x1 = ['x1']
var x2 = ['x2']
var fall = ['Fall']
var spring = ['Spring']
var art = ['Artesano Bakery & Cafe', 0]
var bean = ['Beanz', 0];
var ben = ['Ben & Jerrys', 0];
var brick = ['Brick City Cafe', 0];
var byte = ['Bytes', 0];
var cross = ['Cafe & Market at Crossroads', 0];
var grind = ['The College Grind', 0];
var comm = ['The Commons', 0];
var coho = ['The Corner Store', 0];
var cad = ['CTRL ALT DELi', 0];
var fresh = ['Freshens', 0];
var gv = ['Global Village Cantina & Grille', 0];
var grac = ['Gracies', 0];
var mo = ['Midnight Oil', 0];
var nat = ['Nathans Soup & Salad', 0];
var ritz = ['RITZ Sports Zone', 0];
var sols = ['Sols Underground', 0];
var vending = ['Vending Machines', 0];

console.log(x1)

var chart = c3.generate({
    bindto: "#lineChart",
    data: {
        type: 'area',
        xs: {
            'Fall': 'x1',
            'Spring': 'x2',
        },
        xFormat: '%m/%d/%Y', // 'xFormat' can be used as custom format of 'x'
        columns: [
            x1,
            x2,
            fall,
            spring
        ]
    },
    tooltip: {
        format: {
            value: d3.format('$')
        }
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {

                format: '%m/%d/%Y'
            }
        },
        y: {
            label: "Account Balance",
            tick: {
                format: d3.format('$')
            }
        }
    },
    zoom: {
        enabled: true,
        rescale: true
    },
    color: {
        pattern: ['#E1E199', '#CC99FF']
    }
});

var pieChart = c3.generate({
    bindto: '#pieChart',
    data: {
        columns: [
            art,
            bean,
            ben,
            brick,
            byte,
            cross,
            grind,
            comm,
            coho,
            cad,
            fresh,
            gv,
            grac,
            mo,
            nat,
            ritz,
            sols,
            vending
        ],
        type: 'pie'
    }

})


function getData(transactions) {

    _.forEach(_.reverse(transactions), function(transaction) {

        if (parseFloat(transaction.id) == 1) {
            document.getElementById("Balance").textContent = "Current Balance: $".concat(parseFloat(transaction.curBal).toString());
        }

        switch (transaction.description) {
            case "Artesano Bakery &amp; Cafe":
                art[1] += parseFloat(transaction.amount);
                break;
            case "Beanz":
                bean[1] += parseFloat(transaction.amount);
                break;
            case "Ben &amp; Jerry's":
                ben[1] += parseFloat(transaction.amount);
                break;
            case "Brick City Cafe":
                brick[1] += parseFloat(transaction.amount);
                break;
            case "Bytes on the Run":
                byte[1] += parseFloat(transaction.amount);
                break;
            case "Crossroads Cafe &amp; Market":
                cross[1] += parseFloat(transaction.amount);
                break;
            case "The College Grind":
                grind[1] += parseFloat(transaction.amount);
                break;
            case "The Commons":
                comm[1] += parseFloat(transaction.amount);
                break;
            case "The Corner Store":
                coho[1] += parseFloat(transaction.amount);
                break;
            case "Ctrl Alt Deli":
                cad[1] += parseFloat(transaction.amount);
                break;
            case "Freshens":
                fresh[1] += parseFloat(transaction.amount);
                break;
            case "Global Village Cantina and Gri":
                gv[1] += parseFloat(transaction.amount);
                break;
            case "Grace Watson Dining Hall":
                grac[1] += parseFloat(transaction.amount);
                break;
            case "Midnight Oil":
                mo[1] += parseFloat(transaction.amount);
                break;
            case "Nathans Soup &amp; Salad":
                nat[1] += parseFloat(transaction.amount);
                break;
            case "RITZ Sports Zone":
                ritz[1] += parseFloat(transaction.amount);
                break;
            case "Sol's Underground":
                sols[1] += parseFloat(transaction.amount);
                break;
            case "Dining Services Office":
                break;

            default:
                vending[1] += parseFloat(transaction.amount);

        }

        var day = moment(transaction.date).startOf(day)
        var daystr = day.format("MM/DD/YYYY")
        console.log(daystr)
        var startday = moment("2015-12-18")
        var endday = moment("2015-12-21")
        if (day.isBefore(startday)) {
            if (x1[x1.length - 1].localeCompare(daystr) != 0 && x2[x2.length - 1].localeCompare(daystr) != 0) {
                x1.push(daystr)
                fall.push(parseFloat(transaction.curBal))
            }

        } else if (day.isAfter(endday)) {
            if (x1[x1.length - 1].localeCompare(daystr) != 0 && x2[x2.length - 1].localeCompare(daystr) != 0) {
                x2.push(daystr)
                spring.push(parseFloat(transaction.curBal))
            }
        }

    })

    chart.load({
        columns: [
            x1,
            x2,
            fall,
            spring
        ]
    })
    pieChart.load({
        columns: [
            art,
            bean,
            ben,
            brick,
            byte,
            cross,
            grind,
            comm,
            coho,
            cad,
            fresh,
            gv,
            grac,
            mo,
            nat,
            ritz,
            sols,
            vending
        ],
    })

}
