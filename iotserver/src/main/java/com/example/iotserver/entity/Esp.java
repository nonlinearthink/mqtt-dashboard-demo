package com.example.iotserver.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author nonlinearthink
 */
@Entity
@Table(name = "esp")
@Getter
@Setter
public class Esp {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private String clientId;
    private float temperature;
    private float humidity;
}
