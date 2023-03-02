// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// TODO(you): Implement the music visualizer. You will need to create classes
// other than `App` to complete this assignment. See HW4 writeup for hints and
// more details.
class App {
  constructor() {

    //函数绑定
    this._form_submit = this._form_submit.bind(this);
    this._onResponse = this._onResponse.bind(this);
    this._onJsonReady = this._onJsonReady.bind(this);
    this.change_gif = this.change_gif.bind(this);


    //常量定义
    this.GIF_URL = "https://api.giphy.com/v1/gifs/search?api_key=3K5d67sIiLVqK9brFoHzEUHIZOEOCX0M&limit=25&rating=g&q=";//查询gif的接口
    this.gif_URL = [];//图片的接口


    //构造行为
    this.menu = new Menu();
    this.menu.load_songs();
    this.music = new Music(this.change_gif);
    //添加一个事件
    document.addEventListener("form-submit",this._form_submit);
  }

  _onResponse(response)
  {
    return response.json();
  }

  _onJsonReady(json)
  { 
    for(let tem of json.data)
    {
      this.gif_URL.push(tem.images.downsized.url);
    } 

    let url_i_1 = Math.floor(Math.random() * this.gif_URL.length);
    let url_i_2 = Math.floor(Math.random() * this.gif_URL.length);
    while(url_i_2 === url_i_1)
    {
      url_i_2 = Math.floor(Math.random() * this.gif_URL.length);
    }
    this.music.set_url(url_i_1,this.gif_URL[url_i_1],url_i_2,this.gif_URL[url_i_2]);
  }

  /**
   * 改变gif 
   *
   */
  change_gif()
  {
    if(this.music.isfore)
    {//如果是前景
      //让前景后退 后景前移
      this.music.foreground.classList.remove("top");
      this.music.background.classList.add("top");
      // 让前景的url 变成和后景不同的一个
      let back_urli =parseInt(this.music.background.dataset.num) ;
      let tem = Math.floor(Math.random() * this.gif_URL.length);
      while(tem === back_urli)
      {
        tem = Math.floor(Math.random() * this.gif_URL.length);
      }
      this.music.foreground.style.backgroundImage="url("+ this.gif_URL[tem] +")";
      this.music.foreground.dataset.num = tem;
      this.music.isfore = 0;
    }else    
    {//如果是后景
      this.music.background.classList.remove("top");
      this.music.foreground.classList.add("top");
      // 让前景的url 变成和后景不同的一个
      let fore_urli =parseInt(this.music.foreground.dataset.num) ;
      let tem = Math.floor(Math.random() * this.gif_URL.length);
      while(tem === fore_urli)
      {
        tem = Math.floor(Math.random() * this.gif_URL.length);
      }
      this.music.background.style.backgroundImage="url("+ this.gif_URL[tem] +")";
      this.music.background.dataset.num = tem;
      this.music.isfore = 1;
    }
  }

  /**
   * 当用户点击提交以后，隐藏菜单
   * 
   * 展示音乐界面，根据用户得到的主题获取GIF
   * 
   * 激活play_Song事件
   * @param {*} event 
   */
  _form_submit(event)
  {

    this.menu.hidden();
    this.music.show();
    let tem = event.detail;
    let url = (this.GIF_URL +encodeURIComponent( tem.gifValue));
    fetch(url)
    .then(this._onResponse)
    .then(this._onJsonReady);


    document.dispatchEvent(new CustomEvent("play_song",{detail:tem}));
  }

  // TODO(you): Add methods as necessary.
}
