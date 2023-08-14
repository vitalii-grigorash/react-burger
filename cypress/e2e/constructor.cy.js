import { config } from '../../src/utils/config';
const BASE_URL = config.baseUrl;

describe('e2e tests for main page', () => {

    beforeEach(() => {

        cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" });
        cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json" }).as("postOrder");

        window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
        window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));

        cy.viewport(1920, 1024);
        cy.visit('http://localhost:3000/');

    });

    it('should handle open ingredient details modal', () => {
        cy.get('[data-testid=ingredient_card]').first().click();
        cy.contains('Детали ингредиента');
        cy.get('[data-testid=modal_close]').click();
    });

    it('should dnd bun ingredient to constructor', () => {
        cy.get('[data-testid=ingredient_card]').first().trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=ingredient_card]').eq(1).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
    });

    it('should dnd main ingredients to constructor', () => {
        cy.get('[data-testid=ingredient_card]').eq(2).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=ingredient_card]').eq(3).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=ingredient_card]').eq(6).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
    });

    it('should dnd bun and main ingredients', () => {
        cy.get('[data-testid=ingredient_card]').first().trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=ingredient_card]').eq(3).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=ingredient_card]').eq(5).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=ingredient_card]').eq(9).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
    })

    it('should handle open bun error', () => {
        cy.get('[data-testid=order_button]').click();
        cy.contains('Необходимо выбрать булку');
        cy.get('[data-testid=modal_close]').click();
    })

    it('should handle open ingredient error', () => {
        cy.get('[data-testid=ingredient_card]').first().trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=order_button]').click();
        cy.contains('Необходимо добавить ингредиент');
        cy.get('[data-testid=modal_close]').click();
    })

    it('should handle open order details', () => {
        cy.get('[data-testid=ingredient_card]').first().trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=ingredient_card]').eq(3).trigger('dragstart');
        cy.get('[data-testid=burger-constructor]').trigger('drop');
        cy.get('[data-testid=order_button]').click();
        cy.get("[data-testid=order_number]").contains("16599").should("exist");
        cy.get('[data-testid=modal_close]').click();
    })

})