export default function update(parameter) {
    let input = parameter.sort((arr1, arr2) => {
        return arr2[2] - arr1[2];
        //arr's structure [name, frequency, timesPlayed];
    });
    
    localStorage.setItem("CODECMP3_DATA", JSON.stringify(input));
}