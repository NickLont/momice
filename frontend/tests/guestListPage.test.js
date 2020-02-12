import puppeteer from 'puppeteer'

let page, browser

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
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

describe('H3 Text', () => {
  test('H3 loads correctly', async () => {
    await page.goto('http://localhost:8003/#/guest-list')
    await page.waitForSelector('.c-guest-list-page__title')

    const html = await page.$eval('.c-guest-list-page__title', e => e.innerHTML)
    expect(html).toBe('Select an event to view the guest list')
  }, 16000)
  test('Drop down list exists', async () => {
    await page.goto('http://localhost:8003/#/guest-list')
    await page.waitForSelector('select[name=guest-list]')
    await page.click('select[name=guest-list]')
    await page.waitForSelector('select[name=guest-list]>option:nth-child(2)')
    const eventValue = await page.evaluate(() => {
      return document.querySelector('select[name=guest-list] option:nth-child(2)').value
    })
    await page.select('select[name=guest-list]', eventValue)
    await page.waitForSelector('.name', '.no-guests')
  }, 9000000)
})
