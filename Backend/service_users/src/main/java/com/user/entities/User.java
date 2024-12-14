package com.user.entities;

import java.sql.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class User {
    @Id
    private String id;

    private String name;
    private String lastName;       
    private String phoneNumber;   
    private Date date;             
    private String sexe;          
    private String address;        
    private String emailAddress;
	@Column(name="photo",length=99999999)
    private String photo;          
    private String role;
    private String password;
	public User(String id, String name, String lastName, String phoneNumber, Date date, String sexe, String address,
			String emailAddress, String photo, String password) {
		super();
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.date = date;
		this.sexe = sexe;
		this.address = address;
		this.emailAddress = emailAddress;
		this.photo = photo;
		this.role = "user";
		this.password = password;
	}

	public User( String name, String lastName,
				String emailAddress,String password) {
		super();
		this.name = name;
		this.lastName = lastName;
		this.emailAddress = emailAddress;
		this.password = password;
	}
	public User() {
		super();
	}
	
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	
	public String isSexe() {
		return sexe;
	}
	public void setSexe(String sexe) {
		this.sexe = sexe;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}       
}
