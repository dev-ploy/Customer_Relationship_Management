package com.CRM.project.service.impl;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class PassEncoderService {
    private static final int SALT_LENGTH=16;
    public String encode(String password){
        try{
            //generate salt
            SecureRandom random=new SecureRandom();
            byte[]salt=new byte[SALT_LENGTH];
            random.nextBytes(salt);

            //hash password with salt
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                md.update(salt);
                byte[] hashedPassword = md.digest(password.getBytes());
                //combine salt and hash
                byte[]combined=new byte[salt.length+hashedPassword.length];
                System.arraycopy(salt,0,combined,0,salt.length);
                System.arraycopy(hashedPassword,0,combined,salt.length,hashedPassword.length);
                return Base64.getEncoder().encodeToString(combined);
//            }catch(Exception e){
//                e.printStackTrace();
//            }
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
    public boolean matches(String raw,String encoded){
        try{
            byte[] combined=Base64.getDecoder().decode(encoded);
            //extract salt
            byte []salt=new  byte[SALT_LENGTH];
            System.arraycopy(combined,0,salt,0,SALT_LENGTH);
            //hash raw pass with extracted salt
            MessageDigest md=MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[]hashed=md.digest(raw.getBytes());
            //compare hashed
            byte[]stored=new byte[combined.length-SALT_LENGTH];
            System.arraycopy(combined,SALT_LENGTH,stored,0,stored.length);
            return MessageDigest.isEqual(hashed,stored);
        }catch (NoSuchAlgorithmException e){
            throw new RuntimeException("error matching Password",e);
        }
    }
}
