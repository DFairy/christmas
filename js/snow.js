$(function() {

    /**
     * ѩ��
     * @param {[type]} elementName [description]
     */
    function Snowflake(elementName) {

        var snowElement = document.getElementById(elementName)
        var canvasContext = snowElement.getContext("2d");
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;

        //canvas�ߴ�����
        snowElement.width = width;
        snowElement.height = height;

        //����ѩ�������
        var snowNumber = 50;

        //����ѩ�����
        var snowArrObjs = initSnow(snowNumber, width, height);
        var snowArrNum = snowArrObjs.length;
        /**
         * ����ҳ��
         * @return {[type]} [description]
         */
        var render = function() {
            //����֮ǰ�ľ�������
            canvasContext.clearRect(0, 0, width, height);
            for (var i = 0; i < snowArrNum; ++i) {
                snowArrObjs[i].render(canvasContext);
            }
        }

        /**
         * ����ѩ��
         * @return {[type]} [description]
         */
        var update = function() {
            for (var i = 0; i < snowArrNum; ++i) {
                snowArrObjs[i].update();
            }
        }

        /**
         * ���������
         * @return {[type]} [description]
         */
        var renderAndUpdate = function() {
            render();
            update();
            requestAnimationFrame(renderAndUpdate);
        }

        renderAndUpdate();
    }

    function initSnow(snowNumber, width, height) {
        //ѩ�����
        var options = {
            //ѩ��İ������
            minRadius: 3,
            maxRadius: 10,
            // �˶��ķ�Χ����
            maxX: width,
            maxY: height,
            //����
            minSpeedY: 0.05,
            maxSpeedY: 2,
            speedX: 0.05,
            //�˾�
            minAlpha: 0.5,
            maxAlpha: 1.0,
            minMoveX: 4,
            maxMoveX: 18
        }
        var snowArr = [];
        for (var i = 0; i < snowNumber; ++i) {
            snowArr[i] = new Snow(options);
        }
        return snowArr;
    }

    /**
     * ѩ����
     */
    function Snow(snowSettings) {
        this.snowSettings = snowSettings;
        this.radius = randomInRange(snowSettings.minRadius, snowSettings.maxRadius);
        //��ʼ��xλ��
        this.initialX = Math.random() * snowSettings.maxX;
        this.y = -(Math.random() * 500);
        //���е�����
        this.speedY = randomInRange(snowSettings.minSpeedY, snowSettings.maxSpeedY);
        this.speedX = snowSettings.speedX;
        //�˾�
        this.alpha = randomInRange(snowSettings.minAlpha, snowSettings.maxAlpha);
        //�Ƕ�.Ĭ����360
        this.angle = Math.random(Math.PI * 2);
        //���еľ���
        this.x = this.initialX + Math.sin(this.angle);
        //x�ƶ�����
        this.moveX = randomInRange(snowSettings.minMoveX, snowSettings.maxMoveX);
    }

    /**
     * ����ѩ��
     * @param  {[type]} canvasContext [description]
     * @return {[type]}               [description]
     */
    Snow.prototype.render = function(canvasContext) {
        //���·��
        //��ʼһ�������е�һ����·����������·����һ�����ϣ�
        canvasContext.beginPath();
        //�������·���ĵ�ǰ����ɫ����ɫ��ѩ��
        canvasContext.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        //һ�����ĵ�Ͱ뾶��Ϊһ�������ĵ�ǰ��·�����һ������
        //���꣬Բ������Բָ�����Ŀ�ʼ��ͽ������һ���Ƕ�
        //������Բ�ܵ���ʱ�뷽��TRUE������˳ʱ�뷽��FALSE������
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        //�ر���·��
        canvasContext.closePath();
        //fill() ����ʹ�� fillStyle ������ָ������ɫ�������ģʽ����䵱ǰ·��
        canvasContext.fill();
    }

    Snow.prototype.update = function() {
        this.y += this.speedY;
        if (this.y > this.snowSettings.maxY) {
            this.y -= this.snowSettings.maxY;
        }
        this.angle += this.speedX;
        if (this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2;
        }
        //?
    }


    /**
     * �������
     * @param  {[type]} min [description]
     * @param  {[type]} max [description]
     * @return {[type]}     [description]
     */
    function randomInRange(min, max) {
        var random = Math.random() * (max - min) + min;
        return random;
    }


    Snowflake("snowflake")
})