/// <reference types="cypress" />

describe('Тестирование получения данных', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', 'api/auth/user', {fixture: 'apiUser.json'}).as(
      'getUser'
    );

    localStorage.setItem('refreshToken', 'refresh-token');
    cy.setCookie('accessToken', 'access-token');
    cy.visit('http://localhost:4000');

  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Тест получения ингредиентов', () => {
    // Дождаться ответа с моковыми данными
    cy.wait('@getIngredients');

    cy.get('[data-testid="ingredient-item"]').then((items) => {
      expect(items).to.have.length(3);
    });
  });
  it('Тест добавления булки и начинки в конструктор', () => {
    // Дождаться загрузки ингредиентов
    cy.wait('@getIngredients');

    // Добавление булки (предположим, что булки идентифицируются через какой-то текст или атрибут)
    cy.get('[data-testid="ingredient-item"]')
      .contains('Краторная булка N-200i') // Находим булку по названию
      .parents('[data-testid="ingredient-item"]') // Находим родительский элемент
      .find('button') // Ищем кнопку внутри этого элемента
      .click();

    // Добавление начинки (например, можно идентифицировать по классу или тексту)
    cy.get('[data-testid="ingredient-item"]')
      .contains('Биокотлета из марсианской Магнолии') // ищем начинку
      .parents('[data-testid="ingredient-item"]')
      .find('button') // находим кнопку "Добавить"
      .click();
  });
  it('Тест открытия, закрытия модального окна ингредиента', () => {
    cy.wait('@getIngredients');

    cy.get('[data-testid="ingredient-item"]')
      .should('exist')
      .contains('Краторная булка N-200i') // Находим булку
      .click(); // Открываем модальное окно

    cy.get('#modals .Z7mUFPBZScxutAKTLKHN').click().should('not.exist');

    cy.get('[data-testid="ingredient-item"]')
      .should('exist')
      .contains('Краторная булка N-200i')
      .click();

    cy.get('#modals .RuQycGaRTQNbnIEC5d3Y')
      .should('exist')
      .click({ force: true });
  });
  it('Тест создания заказа', () => {
    cy.intercept('POST', 'api/orders', {
      body: {
        success: true,
        name: 'Название бургера',
        order: { number: 123456 },
      },
    }).as('createOrder');

    cy.get('[data-testid="ingredient-item"]')
    .contains('Биокотлета из марсианской Магнолии') // ищем начинку
    .parents('[data-testid="ingredient-item"]')
    .find('button') // находим кнопку "Добавить"
    .click();

    cy.get('[data-testid="ingredient-item"]')
    .contains('Краторная булка N-200i') // Находим булку по названию
    .parents('[data-testid="ingredient-item"]') // Находим родительский элемент
    .find('button') // Ищем кнопку внутри этого элемента
    .click();

    cy.get('button').contains('Оформить заказ').click();

    // Ожидаем, что заказ будет отправлен
    cy.wait('@createOrder');

    cy.get('.R0Ja10_UixREbmJ6qzGV').should('contain', 'Выберите булки');
    cy.get('.R0Ja10_UixREbmJ6qzGV').should('contain', 'Выберите начинку');
  });
});
