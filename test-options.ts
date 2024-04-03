import {test as base} from '@playwright/test'

export type TestOptions = {
    automationExerciseURL: string;
}

export const test = base.extend<TestOptions>({
    automationExerciseURL: async ({page}, use)=>{
        await page.goto('https://www.automationexercise.com');
        await use('')
    }
})