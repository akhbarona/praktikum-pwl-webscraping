const puppeteer = require("puppeteer");
const dayjs = require('dayjs')

module.exports = {
  get: async (urls) => {
    let launchOptions = { headless: true, args:  [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ] };
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.goto("https://"+urls, {waitUntil: 'load', timeout: 0});
    await page.exposeFunction('formatDate', (e) =>  dayjs(e).format('DD-MM-YYYY HH:mm:ss'));
    
    const data = []

    switch (urls) {
      case 'goal.com':
        const elements1 = await page.$$('article.card-type-article.type-article '); 
        for(let i=0; i< elements1.length && i<10; i++){
          const searchRcrd = elements1[i];
          const title = await searchRcrd.$eval('a.type-article .title h3', (e)=> e.getAttribute('title'))
          const date = await searchRcrd.$eval('footer time', (e)=> e.getAttribute('datetime'))
          const time = dayjs(date).format('DD-MM-YYYY HH:mm:ss')
          const image = await searchRcrd.$eval('a.type-article .picture img', (e)=> e.getAttribute('srcset').replace('w=270 270w','w=1000').split(',')[0].trim())
          const source = 'www.goal.com/id'
          const link = 'https://goal.com' + await searchRcrd.$eval('a.type-article', (e)=> e.getAttribute('href'))
          data.push({
            'title' : title,
            'date' : time,
            'image' : image,
            'source' : source,
            'link' : link
         })
        }return data;
      case 'panditfootball.com':
          const selector = '.news-block'
          const elements2 = await page.$$(selector); 
          for(let i=0; i< elements2.length && i<10 ; i++){
            const searchRcrd = elements2[i];
            const title = await searchRcrd.$eval('.news-details .news-title a', (e)=> e.innerText)
            const date = await searchRcrd.$eval('.news-details .simple-share', (e)=> e.innerText.replace(/[/]/g,'-').replace(/$/gm,':00'))
            const image = await searchRcrd.$eval('a.overlay-link figure.image-overlay img', (e)=> e.getAttribute('src'))
            const source = 'www.panditfootball.com'
            const link = await searchRcrd.$eval('.news-details .news-title a', (e)=> e.getAttribute('href'))
             data.push({
              'title' : title,
              'date' : date,
              'image' : image,
              'source' : source,
              'link' : link
            })
          }return data;
      case 'sport.detik.com':
        const elements3 = await page.$$('li .gtm_newsfeed_artikel');
        for(let i=0; i< elements3.length && i<10 ; i++){
          const searchRcrd = elements3[i];
          const cek = await searchRcrd.$eval('div.desc_nhl a', (e) => e.getAttribute('href').toLowerCase().indexOf(('/sepakbola/').toLowerCase()) > -1)
          if(cek===true){
            const title = await searchRcrd.$eval('div.desc_nhl a h2', (e)=> e.innerText)
            const date = await searchRcrd.$eval('div.desc_nhl .labdate.f11', (e)=> e.innerText.replace(/[\w]*\s\W\s/g,'').trim())
            const image = await searchRcrd.$eval('div.ratio9_8 div.img_con a img', (e)=> e.getAttribute('src'))
            const source = 'www.sport.detik.com'
            const link = await searchRcrd.$eval('div.desc_nhl a', (e)=> e.getAttribute('href'))
            data.push({'title' : title,'date' : date,'image' : image,'source' : source,'link' : link})
          }
        }return data;
      case 'bola.com':
        const elements4 = await page.$$('div.articles > div.articles--iridescent-list'); 
        for(let i=0; i< elements4.length && i<10; i++){
          const searchRcrd = elements4[i];
          const title = await searchRcrd.$eval('figure > a', (e)=> e.getAttribute('title'))
          const date = await searchRcrd.$eval('aside > header > span > time', (e)=> e.getAttribute('datetime'))
          const time = dayjs(date).format('DD-MM-YYYY HH:mm:ss')
          const image = await searchRcrd.$eval('figure > a > picture > source', (e)=> e.getAttribute('data-srcset').replace(/[1-2][x]\b/g,'').split(',')[1].trim())
          const source = 'www.bola.com'
          const link = await searchRcrd.$eval('figure > a', (e)=> e.getAttribute('href'))
          data.push({
            'title' : title,
            'date' : time,
            'image' : image,
            'source' : source,
            'link' : link
         })
        }return data;
      default:
       alert('Halaman tidak terkoneksi')
    }
    await browser.close();
  },
};