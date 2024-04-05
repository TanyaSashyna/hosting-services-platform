/* eslint-disable @typescript-eslint/no-explicit-any */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// eslint-disable-next-line import/no-extraneous-dependencies
import "jest-styled-components";

global.matchMedia =
  global.matchMedia ||
  function (): unknown {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

global.scrollTo = jest.fn();

Math.random = function (): number {
  return 0;
};

export function setMatched(matched: boolean): void {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: matched,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });
}

jest.mock("@project-name-frontend/ui-package", () => ({
  ...(jest.requireActual("@project-names-frontend/ui-package") as object),
  materialCore: {
    withWidth: () => {
      return (item: any): any => item;
    },
  },
}));

jest.mock("@project-name-frontend/shared-context", () => ({
  ...(jest.requireActual("@project-name-frontend/shared-context") as object),
  useLoadingPage: (): unknown => ({
    pushLoading: jest.fn(),
    popLoading: jest.fn(),
  }),
  useAccountSwitcher: (): unknown => ({
    currentAccount: {
      roles: [],
      number: "1234",
    },
  }),
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  useNavigate: (path: string) => jest.fn(),
}));
