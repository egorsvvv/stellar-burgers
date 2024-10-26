/// <reference types="cypress" />

const testUrl = 'http://localhost:4000';
const ingredientItem = '[data-testid="ingredient-item"]';
const bun = 'Краторная булка N-200i';
const ingredient = 'Биокотлета из марсианской Магнолии';
const button = 'button';
const constructor = '.R0Ja10_UixREbmJ6qzGV'

describe('Тестирование получения данных', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', 'api/auth/user', { fixture: 'apiUser.json' }).as(
      'getUser'
    );

    localStorage.setItem('refreshToken', 'refresh-token');
    cy.setCookie('accessToken', 'access-token');
    cy.visit(testUrl);
  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Тест получения ингредиентов', () => {
    // Дождаться ответа с моковыми данными
    cy.wait('@getIngredients');

    cy.get(ingredientItem).then((items) => {
      expect(items).to.have.length(3);
    });
  });
  it('Тест добавления булки и начинки в конструктор', () => {
    // Дождаться загрузки ингредиентов
    cy.wait('@getIngredients');

    // Добавление булки (предположим, что булки идентифицируются через какой-то текст или атрибут)
    cy.get(ingredientItem)
      .contains(bun) // Находим булку по названию
      .parents(ingredientItem) // Находим родительский элемент
      .find(button) // Ищем кнопку внутри этого элемента
      .click();

    // Добавление начинки (например, можно идентифицировать по классу или тексту)
    cy.get(ingredientItem)
      .contains(bun) // ищем начинку
      .parents(ingredientItem)
      .find(button) // находим кнопку "Добавить"
      .click();
  });
  it('Тест открытия, закрытия модального окна ингредиента', () => {
    cy.wait('@getIngredients');

    cy.get(ingredientItem)
      .should('exist')
      .contains(bun) // Находим булку
      .click(); // Открываем модальное окно

    cy.get('#modals .Z7mUFPBZScxutAKTLKHN').click().should('not.exist');

    cy.get(ingredientItem).should('exist').contains(bun).click();

    cy.get('#modals .RuQycGaRTQNbnIEC5d3Y')
      .should('exist')
      .click({ force: true });
  });
  it('Тест создания заказа', () => {
    cy.get(ingredientItem)
      .contains(ingredient) // ищем начинку
      .parents(ingredientItem)
      .find(button) // находим кнопку "Добавить"
      .click();

    cy.get(ingredientItem)
      .contains(bun) // Находим булку по названию
      .parents(ingredientItem) // Находим родительский элемент
      .find(button) // Ищем кнопку внутри этого элемента
      .click();

    cy.get(button).contains('Оформить заказ').click();

    cy.intercept('POST', 'api/orders', {
      body: {
        success: true,
        name: 'Название бургера',
        order: { number: 123456 }
      }
    }).as('createOrder');

    // Ожидаем, что заказ будет отправлен
    cy.wait('@createOrder').then((interception) => {
      expect(interception.response).to.not.be.undefined;
      if (interception.response) {
        expect(interception.response.body).to.have.property('success', true);
        expect(interception.response.body).to.have.property('name', 'Название бургера');
        expect(interception.response.body.order).to.have.property('number', 123456);
      }
    });

    cy.get(constructor).should('contain', 'Выберите булки');
    cy.get(constructor).should('contain', 'Выберите начинку');
  });
});
