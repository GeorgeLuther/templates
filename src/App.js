import React from 'react';

class App extends React.Component {
  state = {
    search: 0,
    triesLinear: 0,
    triesBinary: 0,
    resultBinary: 0,
  }
  arr = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]
  arrSorted = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]
  
  handleSearchTerm=(e)=>{ 
    this.setState({search: Number(e.target.value)})
  }

  indexOf=(array, value)=>{
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
          return i;
        }
    }
    return -1;
  };

  binarySearch=(array, value, start, end, steps)=> {
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length : end;
    steps = steps === undefined ? 0 : steps

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item === value) {
        return [index, steps]

    }
    else if (item < value) {
        steps++
        return this.binarySearch(array, value, index + 1, end, steps);
    }
    else if (item > value) {
        steps++
        return this.binarySearch(array, value, start, index - 1, steps);
    }
  };

  handleSearches=()=>{
    this.setState({triesLinear: this.indexOf(this.arr, this.state.search)})
    
    this.setState({triesBinary: 0})
    let resultArr = this.binarySearch(this.arrSorted.sort(), this.state.search)
    this.setState({triesBinary: resultArr[1]})
    this.setState({resultBinary: resultArr[0]})
  }
  
  render(){ 
    return (
    <main className='App'>

      <input 
        id={'searchbar'} 
        placeholder={'enter search'}
        onChange={this.handleSearchTerm}
      >
      </input>
      <button 
        id={'submit'}
        onClick={this.handleSearches}
      >search
      </button>
      
      <div className={'output'}> 
        <label>
          linear steps:
        <p id={'tries linear'}>{this.state.triesLinear}</p>
        </label>

        <label>
          binary steps:
        <p id={'tries binary'}>{this.state.triesBinary}</p>
        </label>
      </div>
      <div className={'output'}>
        <label>
          linear result:
        <p id={'result linear'}>{this.arr[this.state.triesLinear]}</p>
        </label>
        
        <label>
          binary result:
        <p id='result binary'>{this.arrSorted.sort()[this.state.resultBinary]}</p>
        </label>
      </div>      
    </main>
    )
  }
}

export default App;