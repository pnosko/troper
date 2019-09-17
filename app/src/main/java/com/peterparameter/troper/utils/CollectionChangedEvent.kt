package com.peterparameter.troper.utils

interface CollectionChangedEvent<T>
data class ElementAdded<T>(val added: T): CollectionChangedEvent<T>
data class ElementRemoved<T>(val removed: T): CollectionChangedEvent<T>
