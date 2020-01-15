const parseStringAsArray = require('../src/utils/parseStringAsArray');

describe('Test Server APP', () => {

  it('should return 03 itens on Array', async () => {
    const expectedArray = ['NodeJS', 'Angular', 'Scrum'];
    const stringBase = 'NodeJS, Angular, Scrum';

    const resultArray = parseStringAsArray(stringBase);

    expect(expectedArray.length).toBe(resultArray.length);
    expect(expectedArray[0]).toBe(resultArray[0]);
    expect(expectedArray[1]).toBe(resultArray[1]);
    expect(expectedArray[2]).toBe(resultArray[2]);
  });
});
