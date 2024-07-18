package com.qima.QimaStore.repositories;

import com.qima.QimaStore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
