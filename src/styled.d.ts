import "styled-components";

// styled-components 테마 정의
declare module "styled-components" {
    export interface DefaultTheme {
        red: string;
        black: {
            veryDark: string;
            darker: string;
            lighter: string;
        };
        white: {
            darker: string;
            lighter: string;
        };
    }
}