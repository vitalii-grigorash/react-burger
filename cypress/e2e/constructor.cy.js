import { config } from '../../src/utils/config';
const BASE_URL = config.baseUrl;

import {
    modalCloseButton,
    ingredientCard,
    burgerConstructor,
    orderButton,
    orderNumber
} from '../../src/utils/test-data';

describe('e2e tests for main page', () => {

    beforeEach(() => {

        cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" });
        cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json" }).as("postOrder");

        window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
        window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));

        cy.viewport(1920, 1024);
        cy.visit('/');

    });

    it('should handle open ingredient details modal', () => {
        cy.get(ingredientCard).first().click();
        cy.contains('Детали ингредиента');
        cy.get(modalCloseButton).click();
    });

    it('should dnd bun ingredient to constructor', () => {
        cy.get(ingredientCard).first().trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(ingredientCard).eq(1).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
    });

    it('should dnd main ingredients to constructor', () => {
        cy.get(ingredientCard).eq(2).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(ingredientCard).eq(3).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(ingredientCard).eq(6).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
    });

    it('should dnd bun and main ingredients', () => {
        cy.get(ingredientCard).first().trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(ingredientCard).eq(3).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(ingredientCard).eq(5).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(ingredientCard).eq(9).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
    })

    it('should handle open bun error', () => {
        cy.get(orderButton).click();
        cy.contains('Необходимо выбрать булку');
        cy.get(modalCloseButton).click();
    })

    it('should handle open ingredient error', () => {
        cy.get(ingredientCard).first().trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(orderButton).click();
        cy.contains('Необходимо добавить ингредиент');
        cy.get(modalCloseButton).click();
    })

    it('should handle open order details', () => {
        cy.get(ingredientCard).first().trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(ingredientCard).eq(3).trigger('dragstart');
        cy.get(burgerConstructor).trigger('drop');
        cy.get(orderButton).click();
        cy.get(orderNumber).contains("16599").should("exist");
        cy.get(modalCloseButton).click();
    })

})