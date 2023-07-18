// ton code ici

const app = {
  gridSize: 8,

  pixelSize: 30,

  color: '',

  defaultColor: '',

  styles: [
    'empty',
    'inputColor',
  ],

  currentStyle: 'inputColor',

  //Création du formulaire permettant de choisir la taille de la grille et des pixels
  createForm() {
    const formElement = document.querySelector('.configuration');
    console.log(formElement);

    const gridSizeElement = document.createElement('input');
    gridSizeElement.classList.add('input', 'input--gridsize');
    gridSizeElement.placeholder = 'Taille de la grille';

    gridSizeElement.addEventListener('change', app.handleGridSizeChange);

    formElement.append(gridSizeElement);

    const pixelSizeElement = document.createElement('input');
    pixelSizeElement.classList.add('input', 'input--pixelsize');
    pixelSizeElement.placeholder = 'Taille des pixels';

    pixelSizeElement.addEventListener('change', app.handlePixelSizeChange);

    formElement.append(pixelSizeElement);

    const validateButtonElement = document.createElement('button');
    validateButtonElement.classList.add('validate');
    validateButtonElement.type = 'submit';
    validateButtonElement.textContent = 'Valider';

    formElement.addEventListener('submit', app.handleConfigurationFormSubmit);

    formElement.append(validateButtonElement);
  },


  createStylePicker() {
    console.log('je vais le créer !');

    const stylePickerElement = document.createElement('div');

    stylePickerElement.classList.add('stylepicker');

    for (const style of app.styles) {
      const styleElement = document.createElement('div');
      styleElement.classList.add('style', `style--${style}`);

      styleElement.dataset.style = style;

      if (style === app.currentStyle) {
        styleElement.classList.add('style--current');
      }
      stylePickerElement.append(styleElement);
    }

    document.body.append(stylePickerElement);

    const styleElements = document.querySelectorAll('.style');
    console.log(styleElements);

    styleElements.forEach(function (styleElement) {
      styleElement.addEventListener('click', app.handleStyleClick);
    });


    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '';
    colorPicker.className = 'inputColor primary_color color_val';
    stylePickerElement.append(colorPicker);

    let pixelColored = document.querySelector('.pixel--inputColor');
    let coloreeeeeed = document.querySelector('.style--inputColor');
    colorPicker.addEventListener('change', function (Event) {
      let color = Event.currentTarget.value;
      app.color = color;
      colorPicker.style.backgroundColor = `${color}`;
      console.log(color);
      coloreeeeeed.style.backgroundColor = `${color}`;
      console.log(coloreeeeeed);
      pixelColored = coloreeeeeed;
      console.log(pixelColored);
    });


  },

  /**
   * création de la grille
   */
  drawGrid() {

    const gridElement = document.createElement('div');
    gridElement.classList.add('grid');

    for (let indexLine = 1; indexLine <= app.gridSize; indexLine++) {

      const lineElement = document.createElement('div');
      lineElement.classList.add('line');

      for (let indexPixel = 1; indexPixel <= app.gridSize; indexPixel++) {

        const pixelElement = document.createElement('div');
        pixelElement.classList.add('pixel');
        pixelElement.style.height = app.pixelSize + 'px';
        pixelElement.style.width = app.pixelSize + 'px';

        pixelElement.addEventListener('click', app.handlePixelClick);

        lineElement.append(pixelElement);
      }

      gridElement.append(lineElement);
    }

    const invaderElement = document.getElementById('invader');
    //reset de la grille
    invaderElement.innerHTML = '';

    invaderElement.append(gridElement);
  },
  /**
   * gestion du clic sur un pixel (coloriage de la case)
   */

  handlePixelClick(event) {
    let clickedPixel = event.currentTarget;

    /*app.styles.forEach(function (style) {
      clickedPixel.classList.remove(`pixel--${style}`);
    });

    for (const style of app.styles) {
      clickedPixel.classList.remove(`pixel--${style}`);
    }*/

    clickedPixel.classList.add(`pixel--${app.currentStyle}`);
    console.log(app.currentStyle);
    if (app.currentStyle === 'empty') {
      clickedPixel.style.backgroundColor = '#d2dae2';
    } else {
      clickedPixel.style.backgroundColor = `${app.color}`;
    }
  },
  handlePixelSizeChange(event) {
    const pixelSizeElement = event.currentTarget;
    const pixelSizeValue = pixelSizeElement.value;
    app.pixelSize = parseInt(pixelSizeValue, 10);
    console.log('pixel size : ' + app.pixelSize);
  },
  handleGridSizeChange(event) {

    const gridSizeElement = event.currentTarget;
    const gridSizeValue = gridSizeElement.value;
    app.gridSize = parseInt(gridSizeValue, 10);
    console.log('grid size : ' + app.gridSize);
  },
  handleConfigurationFormSubmit(event) {

    event.preventDefault();
    app.drawGrid();
  },
  handleStyleClick(event) {
    console.log('clic style');
    const clickedStyle = event.currentTarget;

    const currentStyle = document.querySelector('.style--current');

    currentStyle.classList.remove('style--current');

    clickedStyle.classList.add('style--current');

    app.currentStyle = clickedStyle.dataset.style;

  },

  /**
   * fonction d'initialisation du module
   */
  init() {
    app.drawGrid();
    app.createForm();
    app.createStylePicker();
  }
};

app.init();