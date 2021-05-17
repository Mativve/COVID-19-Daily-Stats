const apiUrl = "https://mtve.ct8.pl/covid/index.php";
// const apiUrl = "//localhost/_vue/covid-stats/cache_api/index.php";

async function getGlobalStats(){
    const requestOptions = {
        method: 'GET',
    };

    return await fetch(`${apiUrl}?type=global`, requestOptions)
    .then(response => response.json())
    .then(res => {
        // console.log("Called getGlobalStats");
        return res;
    })
    .catch(() => {
        console.log('An error occurred while downloading data!');

        return false;
    });
}

async function getCountriesStats(){
    const requestOptions = {
        method: 'GET',
    };

    return await fetch(`${apiUrl}?type=countries`, requestOptions)
    .then(response => response.json())
    .then(res => {
        // console.log("Called getCountriesStats");
        return res;
    })
    .catch(() => {
        console.log('An error occurred while downloading data!');

        return false;
    });
}

async function getCountryStats(slug){
    if( !slug ){
        console.log('error', 'Slug of country is empty');
        return false;
    }

    const requestOptions = {
        method: 'GET',
    };

    return await fetch(`${apiUrl}?type=country&country=${slug}`, requestOptions)
    .then(response => response.json())
    .then(res => {
        // console.log("Called getCountryStats");
        return res;
    })
    .catch(() => {
        console.log('An error occurred while downloading data!');

        return false;
    });
}

async function getCountryVaccine(slug){
    if( !slug ){
        console.log('error', 'Slug of country is empty');
        return false;
    }

    const requestOptions = {
        method: 'GET',
    };

    return await fetch(`${apiUrl}?type=vaccine&country=${slug}`, requestOptions)
    .then(response => response.json())
    .then(res => {
        // console.log("Called getCountryVaccine");
        return res;
    })
    .catch(() => {
        console.log('An error occurred while downloading data!');

        return false;
    });
}

async function getCountryAdditional(slug){
    if( !slug ){
        console.log('error', 'Slug of country is empty');
        return false;
    }

    const requestOptions = {
        method: 'GET',
    };

    return await fetch(`${apiUrl}?type=additional&country=${slug}`, requestOptions)
    .then(response => response.json())
    .then(res => {
        // console.log("Called getCountryAdditional");
        return res;
    })
    .catch(() => {
        console.log('An error occurred while downloading data!');

        return false;
    });
}

module.exports = {
    getGlobalStats,
    getCountriesStats,
    getCountryStats,
    getCountryVaccine,
    getCountryAdditional
};