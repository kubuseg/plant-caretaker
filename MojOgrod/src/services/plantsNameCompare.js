const plantsNameCompare = (a, b) => {
    if (a.name.toString() < b.name.toString()) {
        return -1;
    }
    if (a.name.toString() > b.name.toString()) {
        return 1;
    }
    return 0;
}

export default plantsNameCompare;