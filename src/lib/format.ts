function chineseToArabic(chineseNumber: string) {
    const numerals :  { [key: string]: number }  = {
      '零': 0, '一': 1, '二': 2, '三': 3, '四': 4,
      '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
      '十': 10, '百': 100, '千': 1000, '万': 10000
    };
  
    let result = 0;
    let tempValue = 0; // For storing temporary sum
  
    for (let i = 0; i < chineseNumber.length; i++) {
      const currentNumber = numerals[chineseNumber[i]];
      if (currentNumber >= 10 && currentNumber < 10000) {
        tempValue = (tempValue === 0 ? 1 : tempValue) * currentNumber;
      } else if (currentNumber === 10000) {
        result += tempValue * currentNumber;
        tempValue = 0;
      } else {
        tempValue += currentNumber;
      }
    }
  
    return result + tempValue;
  }

  function arabicToChinese(arabicNumber: number): string {
    const numerals: string[] = ['0', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const positions: string[] = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];
    if (arabicNumber === 0) {
      return numerals[0];
    }
  
    let chineseNumber = '';
    let currentPos = 0;
    let zeroFlag = false;
    while (arabicNumber > 0) {
      const digit = arabicNumber % 10;
      if (digit === 0) {
        if (!zeroFlag) {
          zeroFlag = true;
          chineseNumber = numerals[digit] + chineseNumber;
        }
      } else {
        zeroFlag = false;
        chineseNumber = numerals[digit] + positions[currentPos] + chineseNumber;
      }
      arabicNumber = Math.floor(arabicNumber / 10);
      currentPos++;
    }
    return chineseNumber.replace(/^一十/, '十');
  }

export {arabicToChinese, chineseToArabic}
