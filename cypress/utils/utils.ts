import * as loginView from '../integration/views/login.view';

const userName = Cypress.env('user');
const userPassword = Cypress.env('pass');
const craneUiUrl = Cypress.env('craneUrl');

export function inputText(fieldId: string, text: string): void {
  cy.get(fieldId).clear().type(text);
}

export function clickByText(fieldId: string, buttonText: string): void {
  cy.contains(fieldId, buttonText).click();
}

export function click(fieldId: string): void {
  cy.get(fieldId).click();
}

export function login(): void {
  cy.visit(craneUiUrl);
  cy.findByText('kube:admin').click();
  inputText(loginView.userNameInput, userName);
  inputText(loginView.userPasswordInput, userPassword);
  clickByText('button', 'Log in');
}

export function next(): void {
  clickByText('button', 'Next');
}

export function selectFromDroplist(selector: string, selectionMade: string): void {
  clickByText('button', selector);
  clickByText('button', selectionMade);
}

export function getTd(columnValue: string, locator: string, tdValue: string) {
  cy.get('td')
    .contains(columnValue)
    .closest('tr')
    .within(() => {
      cy.get(locator).contains(tdValue, { timeout: 2000 });
    });
  return true;
}
