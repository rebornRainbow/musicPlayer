class Menu
{
    //I need to fetch the items
    constructor()
    {
        //绑定事件
        this._onResponse = this._onResponse.bind(this);
        this._processSongs = this._processSongs.bind(this);
        this._on_submit = this._on_submit.bind(this);
        this.show = this.show.bind(this);
        this.hidden = this.hidden.bind(this);

        //常量
        this.themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

        //变量
        this.selector = document.querySelector('#song-selector');
        this.input = document.querySelector('#query-input');
        this.menu = document.querySelector("#menu");
        const form = document.querySelector("form");

        //添加提交事件
        form.addEventListener('submit',this._on_submit);

    }

    /**
     * 隐藏
     */
    hidden()
    {
        this.menu.classList.add('inactive');
    }

    /**
     * 展示
     */
    show()
    {
        this.menu.classList.remove('inactive');
    }
    
    /**
     * 从https://yayinternet.github.io/hw4-music/songs.json载入歌曲播放
     * 
     * 将获得的歌曲添加到选项然后让用户选择
     * 
     * 输入框里随机生成一个主题
     */
    load_songs()
    {
        fetch("https://yayinternet.github.io/hw4-music/songs.json")
        .then(this._onResponse)
        .then(this._processSongs)
    }    

        _onResponse(response)
        {
            return response.json();
        }

        _processSongs(json)
        {

            for(let elem in json)
            {
                let opt = document.createElement('option');
                opt.innerText = json[elem].title;
                opt.value = json[elem].songUrl;
                this.selector.appendChild(opt);
            }
            let random_theme = this.themes[Math.floor(Math.random()*this.themes.length)];

            this.input.value = random_theme;
        
        }  
    

    /**
     * 提交事件
     * 
     * 阻止默认事件
     * 
     * 获得用户的选择，并将其发送给app
     * @param {*} event 
     */
    _on_submit(event)
    {
        event.preventDefault();
        let tem  = {};
        tem['songValue'] = this.selector.options[this.selector.selectedIndex].value;
        tem['gifValue'] = this.input.value;


        document.dispatchEvent(
            new CustomEvent("form-submit",{detail:tem}));
        // this.show();
    }
    // add it to the song-selector
}