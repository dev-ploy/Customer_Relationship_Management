package com.CRM.project.controller;

import com.CRM.project.entity.Customer;
import com.CRM.project.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {
    CustomerService customerService;
    @Autowired
    public CustomerController(CustomerService customerService) {
        super();
        this.customerService = customerService;
    }
    @PostMapping("/insert")
    public String insertCustomer(@RequestBody Customer customer){
        String msg=customerService.insertCustomer(customer);
        return msg;
    }
    @GetMapping
    public List<Customer> getCustomersList(){
        List<Customer> list=customerService.getCustomersList();
        return list;
    }
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable int id){
        Customer customer=customerService.getCustomerById(id);
        return customer;
    }
    @PutMapping
    public String updateCustomer(@RequestBody Customer customer){
        return customerService.updateCustomer(customer);
    }
    @DeleteMapping("/{id}")
    public String deleteCustomerById(@PathVariable int id){
        return customerService.deleteCustomerById(id);
    }
    @PostMapping("/batch")
    public String insertMultipleCustomers(@RequestBody List<Customer>customers){
        return customerService.insertMultipleCustomers(customers);
    }
    @GetMapping("/byname/{firstName}")
    public List<Customer> getCustomerByFirstName(@PathVariable String firstName){
        return customerService.getCustomerByFirstName(firstName);
    }
    @PostMapping("/bylessthanage/{age}")
    public List<Customer> getCustomerByLessThanAge(@PathVariable int age){
        return customerService.getCustomerByLessThanAge(age);
    }
    @GetMapping("/byage/{age}")
    public List<Customer> getCustomerByAge(@PathVariable int age){
        return customerService.getCustomerByAge(age);
    }
    @GetMapping("/bylastName/{name}")
    public List<Customer> getCustomerByLastName(@PathVariable String name){
        return customerService.getCustomerByLastName(name);
    }
    @GetMapping("/byemail/{email}")
    public List<Customer> getCustomerByEmail(@PathVariable String email){
        return customerService.getCustomerByEmail(email);
    }
    @GetMapping("/bymobile/{mobileNumber}")
    public List<Customer> getCustomerByMobileNumber(@PathVariable String mobileNumber){
        return customerService.getCustomerByMobileNumber(mobileNumber);
    }
    @PutMapping("/{id}")
    public String updateFirstName(@PathVariable int id, @RequestBody Map<String,String> request){
        String firstName=request.get("firstName");
        return customerService.updateFirstName(id,firstName);
    }
    @PutMapping("/lname/{id}")
    public String updateLastName(@PathVariable int id,@RequestBody Map<String,String> request){
        String lastName=request.get("lastName");
        return customerService.updateLastName(id,lastName);
    }
    @PutMapping("/email/{id}")
    public String updateEmailId(@PathVariable int id,@RequestBody Map<String,String> request){
        String email=request.get("email");
        return customerService.updateEmailId(id,email);
    }
    @PutMapping("/mobilenumber/{id}")
    public String updateMobileNumber(@PathVariable int id,@RequestBody Map<String,String>request){
        String mobileNumber=request.get("mobileNumber");
        return customerService.updateMobileNumber(id,mobileNumber);
    }
    @PutMapping("/age/{id}")
    public String updateAge(@PathVariable int id,@RequestBody Map<String,Integer>request){
        int age=request.get("age");
        return customerService.updateAge(id,age);
    }
    @GetMapping("/firstNames")
    public List<String> getFirstNames(){
        return customerService.getCustomerFirstName();
    }
    @GetMapping("/test")
    public String test(){
        return "controller is working";
    }
}
