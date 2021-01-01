#include <math.h>
#include <ESP8266WiFi.h>

#include "ProjectConfig.h"
#include "DHTesp.h"
#include "ArduinoJson.h"
#include "PubSubClient.h"

DHTesp dht;
WiFiClient client;
PubSubClient mqttClient(client);

void setup_wifi()
{
    // 开始连接
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WLAN_SSID);
    WiFi.begin(WLAN_SSID, WLAN_PASS);
    // 等待连接
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println();
    // 连接 WiFi 成功
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}

void mqtt_callback(char *topic, byte *payload, unsigned int length)
{
    // 打印主题信息
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.println("] ");
    // 打印消息
    StaticJsonDocument<256> doc;
    deserializeJson(doc, payload, length);
    serializeJsonPretty(doc, Serial);
    Serial.println();
}

void mqtt_reconnect()
{
    while (!mqttClient.connected())
    {
        Serial.print("Attempting MQTT connection...");
        // 连接 mqtt
        if (mqttClient.connect(MQTT_CLIENTID))
        {
            Serial.println("connected");
            // 连接成功时订阅主题
            mqttClient.subscribe(TOPIC_RGB);
            mqttClient.subscribe(TOPIC_OLED);
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(mqttClient.state());
            Serial.println(" try again in 5 seconds");
            // 等待 5s 后重试
            delay(5000);
        }
    }
}

void setup()
{
    // 串口初始化
    Serial.begin(9600);
    while (!Serial)
        continue;
    // 连接 wifi
    setup_wifi();
    // 设置 mqtt 连接参数
    mqttClient.setServer(MQTT_SERVER, MQTT_PORT);
    mqttClient.setCallback(mqtt_callback);
    // 设置 dht11 端口
    dht.setup(DHT11PIN, DHTesp::DHT11);
}

StaticJsonDocument<256> read_dht()
{
    // 声明一个JsonDocument对象
    StaticJsonDocument<256> doc;
    // 获取数据
    float humidity = dht.getHumidity();
    float temperature = dht.getTemperature();
    // 如果不是 nan，则添加到 json 对象中
    if (!isnan(humidity))
        doc["humidity"] = humidity;
    if (!isnan(temperature))
        doc["temperature"] = temperature;
    return doc;
}

void loop()
{
    // 设置抽样期
    delay(dht.getMinimumSamplingPeriod() * 2);
    // 检查 mqtt 连接和无连接时重连
    if (!mqttClient.connected())
    {
        mqtt_reconnect();
    }
    mqttClient.loop();
    // 发送消息
    Serial.println("Sending data ...");
    // 读取数据
    StaticJsonDocument<256> sendData = read_dht();
    serializeJsonPretty(sendData, Serial);
    Serial.println();
    // 发送数据到 mqtt 订阅
    char buffer[256];
    serializeJson(sendData, buffer);
    mqttClient.publish(TOPIC_ESP, buffer);
}
