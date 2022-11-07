package com.tasteshopping.common.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final StringRedisTemplate redisTemplate;
    private final RedisTemplate<String, Object> redisTemplateObject;
    // key를 통해 value 리턴
    public String getData(String key){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }
    public void addElement(String key, String value){
        redisTemplateObject.opsForList().rightPush(key, value);
    }
    public List getList(String key){
        Long size = redisTemplateObject.opsForList().size(key);
        List<String> result = redisTemplateObject.opsForList().range(key, 0, size).stream()
                                                .map(Object::toString)
                                                .collect(Collectors.toList());
        return result;
    }
    // 데이터 저장
    public void setData(String key, String value){
        ValueOperations<String,String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }
    // 유효 기간 설정
    public void setDataExpire(String key, String value, long duration){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }
    // key를 통해 value 삭제
    public void deleteData(String key){
        redisTemplate.delete(key);
    }

    public void print(){
        Set<byte[]> keys = redisTemplate.getConnectionFactory().getConnection().keys("*".getBytes());

        Iterator<byte[]> it = keys.iterator();

        while(it.hasNext()){

            byte[] data = (byte[])it.next();

            System.out.println(new String(data, 0, data.length));
        }
    }
}
