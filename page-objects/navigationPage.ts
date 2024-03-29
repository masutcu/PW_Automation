import {Page, expect} from "@playwright/test"
import { faker } from '@faker-js/faker'

export class NavigationPage{

    readonly page: Page
    constructor(page: Page){
        this.page=page

    }


    async loginPage(name: string, email: string){
        //6. Enter name and email address
        //7. Click 'Signup' button
        //form alanını tanımladık 
        
        //const singUpForm = this.page.locator('.signup-form').first()
          
        await this.page.getByPlaceholder('Name').pressSequentially(name, { delay: 500 })
        await this.page.getByPlaceholder('Email Address').fill(email)
        await this.page.getByRole('button', {name:'Signup'}).click()
      
    }
}