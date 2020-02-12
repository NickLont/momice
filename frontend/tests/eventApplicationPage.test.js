import faker from 'faker'
import puppeteer from 'puppeteer'

let page, browser

const person = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  birthDate: faker.date.past(10)
}

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    slowMo: 150
  })
  page = await browser.newPage()

  page.emulate({
    viewport: {
      width: 500,
      height: 2400
    },
    userAgent: ''
  })
})

afterEach(async () => {
  await browser.close()
})

describe('Event Submission Page', () => {
  test('H3 loads correctly', async () => {
    await page.goto('http://localhost:8003/')
    await page.waitForSelector('.c-event-application-page__title')

    const html = await page.$eval('.c-event-application-page__title', e => e.innerHTML)
    expect(html).toBe('Event Submission')
  }, 16000)
  test('Can submit event form', async () => {
    await page.goto('http://localhost:8003/')
    await page.waitForSelector('#eventId')
    await page.click('select[name=eventId]')
    await page.waitForSelector('select[name=eventId]>option:nth-child(2)')
    const eventValue = await page.evaluate(() => {
      return document.querySelector('select[name=eventId] option:nth-child(2)').value
    })
    await page.select('select[name=eventId]', eventValue)
    await page.click('input[name=firstName]')
    await page.type('input[name=firstName]', person.firstName)
    await page.click('input[name=lastName]')
    await page.type('input[name=lastName]', person.lastName)
    await page.click('input[name=email]')
    await page.type('input[name=email]', person.email)
    await page.click('input[name=birthDate]')
    await page.type('input[name=birthDate]', person.birthDate.toISOString().split('T')[0])
    await page.click('select[name=gender]')
    await page.waitForSelector('select[name=gender]>option:nth-child(2)')
    const genderValue = await page.evaluate(() => {
      return document.querySelector('select[name=gender] option:nth-child(2)').value
    })
    await page.select('select[name=gender]', genderValue)
    await page.click('#Climbing')
    await page.click('#Drawing')

    // await page.click('button[type=submit]') // commented out so we don 't get false data
  }, 9000000)
})
