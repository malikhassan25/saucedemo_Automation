describe('Swag Labs Product Listing', () => {
    beforeEach(() => {
      // Log in as a standard user before each test
      cy.visit('/v1/index.html')
      cy.get('input[data-test="username"]').type('standard_user')
      cy.get('input[data-test="password"]').type('secret_sauce')
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory.html')
    })
  
    it('should display all products', () => {
      cy.get('.inventory_item').should('have.length', 6)
    })
  
    it('should display correct product details', () => {
      const products = [
        { name: 'Sauce Labs Backpack', price: '$29.99', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.' },
        { name: 'Sauce Labs Bike Light', price: '$9.99', description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.' },
        { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.' },
        { name: 'Sauce Labs Fleece Jacket', price: '$49.99', description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.' },
        { name: 'Sauce Labs Onesie', price: '$7.99', description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.' },
        { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.' },
      ]
  
      products.forEach((product, index) => {
        cy.get('.inventory_item').eq(index).within(() => {
          cy.get('.inventory_item_name').should('have.text', product.name)
          cy.get('.inventory_item_price').should('have.text', product.price)
          cy.get('.inventory_item_desc').should('contain.text', product.description)
        })
      })
    })
  
    it('should add each product to the cart', () => {
      cy.get('.inventory_item').each((item, index) => {
        cy.wrap(item).within(() => {
          cy.get('button').contains('ADD TO CART').click()
          cy.get('button').contains('REMOVE').should('be.visible')
        })
      })
    })
  
    it('should display the correct number of items in the cart', () => {
      cy.get('.inventory_item').each((item) => {
        cy.wrap(item).within(() => {
          cy.get('button').contains('ADD TO CART').click()
        })
      })
      cy.get('.shopping_cart_badge').should('have.text', '6')
    })
  
    it('should sort products by Name (A to Z)', () => {
      cy.get('.product_sort_container').select('Name (A to Z)')
      cy.get('.inventory_item_name').then((names) => {
        const sortedNames = [...names].map(el => el.innerText).sort()
        const actualNames = [...names].map(el => el.innerText)
        expect(actualNames).to.deep.equal(sortedNames)
      })
    })
  
    it('should sort products by Name (Z to A)', () => {
      cy.get('.product_sort_container').select('Name (Z to A)')
      cy.get('.inventory_item_name').then((names) => {
        const sortedNames = [...names].map(el => el.innerText).sort().reverse()
        const actualNames = [...names].map(el => el.innerText)
        expect(actualNames).to.deep.equal(sortedNames)
      })
    })
  
    it('should sort products by Price (low to high)', () => {
      cy.get('.product_sort_container').select('Price (low to high)')
      cy.get('.inventory_item_price').then((prices) => {
        const sortedPrices = [...prices].map(el => parseFloat(el.innerText.replace('$', ''))).sort((a, b) => a - b)
        const actualPrices = [...prices].map(el => parseFloat(el.innerText.replace('$', '')))
        expect(actualPrices).to.deep.equal(sortedPrices)
      })
    })
  
    it('should sort products by Price (high to low)', () => {
      cy.get('.product_sort_container').select('Price (high to low)')
      cy.get('.inventory_item_price').then((prices) => {
        const sortedPrices = [...prices].map(el => parseFloat(el.innerText.replace('$', ''))).sort((a, b) => b - a)
        const actualPrices = [...prices].map(el => parseFloat(el.innerText.replace('$', '')))
        expect(actualPrices).to.deep.equal(sortedPrices)
      })
    })
  
    it('should navigate to product details page on clicking product name', () => {
      cy.get('.inventory_item').first().within(() => {
        cy.get('.inventory_item_name').click()
      })
      cy.url().should('include', '/inventory-item.html')
      cy.get('.inventory_details_name').should('be.visible')
    })
  })
  