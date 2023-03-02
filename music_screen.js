class Music
{
    /**
     * 构造十事件
     * @param {*} kickBack 
     */
    constructor(kickBack)
    {
        //绑定
        this.show_gif = this.show_gif.bind(this);
        this._play_or_pause = this._play_or_pause.bind(this);
        this.hidden = this.hidden.bind(this);
        this.show = this.show.bind(this);
        this.play_song = this.play_song.bind(this);
        this.set_url = this.set_url.bind(this);

        //常量
        this.kickBack = kickBack;
        this.PLAY = "images/play.png";
        this.PAUSE = "images/pause.png";
        this.gif_display = document.querySelector("#gif_display");
        this.bar = document.querySelector("#bar");
        this.play_icon = new Image();
            this.play_icon.src = this.PLAY;
        this.bar.appendChild(this.play_icon);
        this.music_screen  = document.querySelector("#music_screen");
        this.foreground = document.querySelector("#foreground");
        this.background = document.querySelector("#background");

        

        //变量
        this._is_play = 0;//是否正在播放
        this.audio_player  ;
        this.isfore = 1;//表示当前是否是前景在前


        //行为
        this.play_icon.addEventListener("click",this._play_or_pause);
        document.addEventListener("play_song",this.play_song);
        //每隔30秒触发一次
        setInterval(this.kickBack,7000);

    }

    /**
     * 
     * 播放歌曲 新建一耳光audio播放用户选择的歌曲
     * 
     * 设置前景
     * @param {*} event 
     */
    play_song(event)
    {
        let tem = event.detail;
        this.audio_player = new Audio(tem.songValue);
        this._play_or_pause();
    }



    set_url(url_i_1,url1,url_i_2 ,url2)
    {
        this.foreground.style.backgroundImage="url("+ url1 +")";
        this.foreground.dataset.num = url_i_1;
        this.background.style.backgroundImage="url("+ url2 +")";
        this.background.dataset.num = url_i_2;
    }

    /**
     * 将图片切换
     * @param {*} url_list url的列表
     */
    show_gif(url_list)
    {
        // this.gif_display.style.backgroundImage="url("+url+")";
    }

    hidden()
    {
        this.music_screen.classList.add('inactive');
    }
    show()
    {
        this.music_screen.classList.remove('inactive');
    }

    //用播放和暂停
    _play_or_pause(event)
    {
        //event.preventDefault();
        
        if(this._is_play)
        {
            //暂停播放
            this.audio_player.pause();
            this._is_play = 0;
            //让点击事件变成播放，将图表换成播放
            this.play_icon.src = this.PLAY;
        }else
        {
            //开始播放
            this.audio_player.play();

            this._is_play = 1;
            //让点击事件变成暂停
            this.play_icon.src = this.PAUSE;
        } 
        
    }
}